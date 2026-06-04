import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { config } from './config';

export async function writeJsonReport(name: string, data: unknown): Promise<string> {
  await mkdir(config.reportDir, { recursive: true });
  const filePath = path.join(config.reportDir, `${name}.json`);
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
  return filePath;
}

export async function writeMarkdownReport(name: string, markdown: string): Promise<string> {
  await mkdir(config.reportDir, { recursive: true });
  const filePath = path.join(config.reportDir, `${name}.md`);
  await writeFile(filePath, markdown.endsWith('\n') ? markdown : `${markdown}\n`);
  return filePath;
}
