import { execFileSync } from 'node:child_process';
const run = (command, args) => execFileSync(command, args, { encoding: 'utf8', stdio: ['inherit', 'pipe', 'inherit'] }).trim();
if (run('git', ['status', '--porcelain'])) throw new Error('Enregistrer les modifications dans un commit avant de publier.');
if (run('git', ['branch', '--show-current']) !== 'main') throw new Error('Publier depuis main après avoir intégré les modifications vérifiées.');
const revision = run('git', ['rev-parse', 'HEAD']);
// An ordinary push updates the preview only. This explicit command requests production.
execFileSync('git', ['push', 'origin', 'main'], { stdio: 'inherit' });
const repo = run('gh', ['repo', 'view', '--json', 'nameWithOwner', '--jq', '.nameWithOwner']);
execFileSync('gh', ['workflow', 'run', 'production.yml', '--repo', repo, '--ref', 'main', '-f', `revision=${revision}`, '-f', 'publish=true'], { stdio: 'inherit' });
console.log('Publication demandée. Attendre la réussite de « Publier le site officiel » dans GitHub Actions puis vérifier le domaine réel.');
