import { spawnSync } from 'node:child_process';

const scripts = ['seo:canonical-audit', 'seo:metadata-audit', 'seo:link-audit'];

function npmRun(script: string) {
  if (process.env.npm_execpath) {
    return spawnSync(process.execPath, [process.env.npm_execpath, 'run', script], { stdio: 'inherit' });
  }

  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  return spawnSync(npmCommand, ['run', script], { stdio: 'inherit' });
}

for (const script of scripts) {
  const result = npmRun(script);
  if (result.error) console.error(result.error);
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log('SEO report complete. Review generated files in seo-reports/.');
