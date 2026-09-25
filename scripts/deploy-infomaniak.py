#!/usr/bin/env python3
"""Publish the checked static build over verified explicit TLS. No FTP password in files."""
from concurrent.futures import ThreadPoolExecutor
import ftplib
import io
import json
import os
from pathlib import Path, PurePosixPath
import re
import ssl
import sys
import time
from urllib.request import urlopen

SITE = 'https://physio-verbier.com/'
ALLOWED = {'.html', '.css', '.js', '.json', '.txt', '.xml', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.avif', '.ico', '.woff', '.woff2', '.ttf', '.pdf'}

class SecureFTP(ftplib.FTP_TLS):
    # Reuse the authenticated TLS session for ProFTPD data connections.
    def ntransfercmd(self, cmd, rest=None):
        conn, size = ftplib.FTP.ntransfercmd(self, cmd, rest)
        if self._prot_p:
            conn = self.context.wrap_socket(conn, server_hostname=self.host, session=self.sock.session)
        return conn, size


def read_remote(ftp, path):
    out = io.BytesIO()
    ftp.retrbinary('RETR ' + path, out.write)
    return out.getvalue()


def ensure_parent(ftp, name):
    parts = PurePosixPath(name).parts[:-1]
    for i in range(1, len(parts) + 1):
        directory = '/'.join(parts[:i])
        try:
            ftp.mkd(directory)
        except ftplib.error_perm:
            before = ftp.pwd()
            ftp.cwd(directory)  # An existing directory is OK; permission failures are not.
            ftp.cwd(before)


def publish(ftp, files, revision, verify):
    """Stage and read back first; assets precede HTML; restore touched files on failure."""
    assert re.fullmatch(r'[0-9a-f]{40}', revision), 'A full commit is required'
    old_version = json.loads(read_remote(ftp, 'version.json'))
    assert old_version.get('site') == SITE.rstrip('/'), 'Wrong target website'
    assert b'PhysioVerbier' in read_remote(ftp, 'index.html'), 'Wrong target homepage'
    assert read_remote(ftp, '.htaccess') == files['.htaccess'], 'Apache configuration differs; review it separately'
    token = revision[:12] + '-' + str(time.time_ns())
    staged, previous, changed = {}, {}, []
    listings = {}
    # Only read the old files we are replacing; retain old hashed assets for cached pages.
    try:
        for name, data in files.items():
            if name == '.htaccess':
                continue
            parent = str(PurePosixPath(name).parent)
            if parent not in listings:
                ensure_parent(ftp, name)
                listings[parent] = {n for n, facts in ftp.mlsd(parent) if facts.get('type') == 'file'}
            names = listings[parent]
            old = read_remote(ftp, name) if PurePosixPath(name).name in names else None
            if old == data:
                continue
            previous[name] = old
            tmp = name + '.upload-' + token
            staged[name] = tmp
            ftp.storbinary('STOR ' + tmp, io.BytesIO(data))
            assert read_remote(ftp, tmp) == data, 'Upload checksum mismatch: ' + name
        print('Staging verified; activating ' + str(len(staged)) + ' changed files.', flush=True)
        order = sorted(staged, key=lambda n: (2 if n == 'version.json' else 1 if n.endswith('.html') else 0, n))
        for name in order:
            changed.append(name)  # Include a rename whose acknowledgement is lost.
            ftp.rename(staged[name], name)
        print('Activation complete; checking the public website.', flush=True)
        verify(revision, files)
    except Exception:
        failed = []
        for name in reversed(changed):
            try:
                old = previous[name]
                if old is None:
                    ftp.delete(name)
                else:
                    tmp = name + '.restore-' + token
                    ftp.storbinary('STOR ' + tmp, io.BytesIO(old))
                    ftp.rename(tmp, name)
            except Exception:
                failed.append(name)
        if failed:
            raise RuntimeError('Publication interrupted; automatic restoration incomplete: ' + ', '.join(failed)) from None
        raise
    finally:
        for tmp in staged.values():
            try:
                ftp.delete(tmp)
            except ftplib.all_errors:
                pass


def verify_public(revision, files):
    # Confirm all new bytes, including both languages and social images, at the real domain.
    def check_file(item):
        name, data = item
        if name == '.htaccess':
            return
        route = '' if name == 'index.html' else name.removesuffix('index.html')
        for attempt in range(4):
            try:
                with urlopen(SITE + route + '?deployment=' + revision, timeout=30) as response:
                    assert response.status == 200
                    assert response.read() == data, 'Public content differs: ' + name
                break
            except Exception:
                if attempt == 3:
                    raise
                time.sleep(3)
    with ThreadPoolExecutor(max_workers=6) as pool:
        list(pool.map(check_file, files.items()))


def build_files(root):
    result = {}
    for path in sorted(root.rglob('*')):
        assert not path.is_symlink(), 'Symlinks are not deployable'
        if not path.is_file():
            continue
        name = path.relative_to(root).as_posix()
        assert not any(p.startswith('.') for p in PurePosixPath(name).parts) or name == '.htaccess', 'Hidden file: ' + name
        assert name == '.htaccess' or path.suffix.lower() in ALLOWED, 'Not a static asset: ' + name
        assert not any(c in name for c in '\r\n'), 'Invalid filename'
        result[name] = path.read_bytes()
    for required in ['index.html', 'en/home/index.html', 'contact/index.html', '404.html', 'robots.txt', 'sitemap.xml', 'version.json', '.htaccess']:
        assert required in result, 'Incomplete build: ' + required
    return result


def main():
    revision = os.environ['DEPLOY_REVISION']
    files = build_files(Path('dist'))
    assert json.loads(files['version.json'])['revision'] == revision
    directory = os.environ['FTP_DIRECTORY']
    assert directory == '/', 'Use the dedicated FTP account restricted to the published site'

    for key in ['FTP_HOST', 'FTP_USERNAME', 'FTP_PASSWORD']:
        assert os.environ.get(key), 'Missing deployment setting: ' + key
    print('Connecting to the dedicated FTPS account.', flush=True)
    with SecureFTP(context=ssl.create_default_context(), timeout=45) as ftp:
        ftp.connect(os.environ['FTP_HOST'], 21)
        ftp.login(os.environ['FTP_USERNAME'], os.environ['FTP_PASSWORD'])
        ftp.prot_p()
        ftp.cwd(directory)
        print('Connection verified; preparing and checking ' + str(len(files)) + ' files.', flush=True)
        publish(ftp, files, revision, verify_public)
    print('Publication verified on the official domain; previous hashed assets retained.')

if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        # Avoid printing connection objects, environment values or credentials.
        print('Publication failed (' + type(error).__name__ + '). Check configuration and the current site before retrying.', file=sys.stderr)
        sys.exit(1)
