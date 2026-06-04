import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { config } from './shared/config';

async function readOptional(filePath: string): Promise<any | null> {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch {
    return null;
  }
}

async function main() {
  const reports = await Promise.all([
    readOptional(path.join(config.reportDir, 'canonical-audit.json')),
    readOptional(path.join(config.reportDir, 'metadata-audit.json')),
    readOptional(path.join(config.reportDir, 'link-audit.json'))
  ]);

  const actions: string[] = [];
  let id = 1;

  for (const report of reports) {
    for (const result of report?.results ?? []) {
      if (result.issues?.length) {
        actions.push(`- [ ] APPROVE-${String(id).padStart(3, '0')}: Review ${result.url} — ${result.issues.join('; ')}`);
        id += 1;
      }
    }
  }

  const markdown = ['# SEO Human Approval Pack', '', 'Review and approve before implementation.', '', actions.length ? actions.join('\n') : 'No actions generated.', ''].join('\n');
  await mkdir(config.reportDir, { recursive: true });
  const output = path.join(config.reportDir, 'approval-pack.md');
  await writeFile(output, markdown);
  console.log(`Approval pack written: ${output}`);
}

main().catch((error) => { console.error(error); process.exit(1); });
