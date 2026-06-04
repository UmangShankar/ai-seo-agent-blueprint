import { spawnSync } from 'node:child_process';

const commands = [
  ['npm', ['run', 'seo:canonical-audit']],
  ['npm', ['run', 'seo:metadata-audit']]
];

for (const [command, args] of commands) {
  const result = spawnSync(command, args as string[], { stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log('Post-implementation SEO QA complete.');
