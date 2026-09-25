import ftplib
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('deploy', Path(__file__).parents[1] / 'deploy-infomaniak.py')
deploy = importlib.util.module_from_spec(spec)
spec.loader.exec_module(deploy)
REV = 'a' * 40
OLD = {'index.html': b'PhysioVerbier ancien', 'version.json': json.dumps({'site': 'https://physio-verbier.com', 'revision': 'old'}).encode(), '.htaccess': b'fixed rules', '_astro/old.js': b'old asset'}
NEW = {'index.html': b'PhysioVerbier nouveau', 'version.json': json.dumps({'site': 'https://physio-verbier.com', 'revision': REV}).encode(), '.htaccess': b'fixed rules', '_astro/new.js': b'new asset', 'contact/index.html': b'contact'}

class FTP:
    def __init__(self):
        self.files = OLD.copy()
        self.renamed = []
        self.fail = None
        self.corrupt = False
    def retrbinary(self, command, write):
        name = command[5:]
        if name not in self.files: raise ftplib.error_perm('550 missing')
        write(self.files[name])
    def storbinary(self, command, stream):
        self.files[command[5:]] = stream.read() + (b'corrupt' if self.corrupt else b'')
    def mlsd(self, directory):
        return [(Path(p).name, {'type': 'file'}) for p in self.files if str(Path(p).parent) == directory]
    def mkd(self, directory): pass
    def rename(self, source, target):
        self.renamed.append(target)
        if self.fail == target:
            self.fail = None
            raise OSError('simulated interruption')
        self.files[target] = self.files.pop(source)
    def delete(self, name):
        if name not in self.files: raise ftplib.error_perm('550 missing')
        del self.files[name]

class DeploymentTests(unittest.TestCase):
    def test_assets_first_version_last_and_old_assets_retained(self):
        ftp = FTP()
        deploy.publish(ftp, NEW, REV, lambda revision, files: None)
        self.assertEqual(ftp.renamed[0], '_astro/new.js')
        self.assertEqual(ftp.renamed[-1], 'version.json')
        self.assertEqual(ftp.files, {**OLD, **NEW})
    def test_corrupt_staging_does_not_touch_live(self):
        ftp = FTP(); ftp.corrupt = True
        with self.assertRaises(AssertionError): deploy.publish(ftp, NEW, REV, lambda *_: None)
        self.assertEqual(ftp.files, OLD)
    def test_failure_during_activation_restores_previous_files(self):
        ftp = FTP(); ftp.fail = 'index.html'
        with self.assertRaises(OSError): deploy.publish(ftp, NEW, REV, lambda *_: None)
        self.assertEqual(ftp.files, OLD)
    def test_failed_public_verification_rolls_back(self):
        ftp = FTP()
        def reject(*_): raise AssertionError('wrong public bytes')
        with self.assertRaises(AssertionError): deploy.publish(ftp, NEW, REV, reject)
        self.assertEqual(ftp.files, OLD)
    def test_wrong_site_or_apache_rules_are_rejected(self):
        for modified in [{'site': 'https://another.example'}, {'site': 'https://physio-verbier.com'}]:
            ftp = FTP(); ftp.files['version.json'] = json.dumps(modified).encode()
            if modified['site'].endswith('verbier.com'): ftp.files['.htaccess'] = b'different'
            before = ftp.files.copy()
            with self.assertRaises(AssertionError): deploy.publish(ftp, NEW, REV, lambda *_: None)
            self.assertEqual(ftp.files, before)
    def test_symlinks_and_server_code_are_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp); (root/'index.php').write_text('php')
            with self.assertRaises(AssertionError): deploy.build_files(root)
            (root/'index.php').unlink(); (root/'data').symlink_to('/etc/passwd')
            with self.assertRaises(AssertionError): deploy.build_files(root)

if __name__ == '__main__': unittest.main()
