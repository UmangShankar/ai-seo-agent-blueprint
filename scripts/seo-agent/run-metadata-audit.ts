import { config } from './shared/config';
import { crawlPage } from './shared/crawler';
import { getSitemapUrls } from './shared/sitemap';
import { runWithConcurrency } from './shared/concurrency';
import { writeJsonReport, writeMarkdownReport } from './shared/report';

type Result = { url: string; title: string | null; titleLength: number; metaDescription: string | null; metaDescriptionLength: number; h1Count: number; h1: string[]; issues: string[] };

function audit(snapshot: Awaited<ReturnType<typeof crawlPage>>): Result {
  const titleLength = snapshot.title?.length ?? 0;
  const metaDescriptionLength = snapshot.metaDescription?.length ?? 0;
  const issues: string[] = [];
  if (!snapshot.title) issues.push('Missing title');
  if (titleLength > 0 && titleLength < 20) issues.push('Title may be too short');
  if (titleLength > 65) issues.push('Title may be too long');
  if (!snapshot.metaDescription) issues.push('Missing meta description');
  if (metaDescriptionLength > 0 && metaDescriptionLength < 70) issues.push('Meta description may be too short');
  if (metaDescriptionLength > 170) issues.push('Meta description may be too long');
  if (snapshot.h1.length === 0) issues.push('Missing H1');
  if (snapshot.h1.length > 1) issues.push(`Multiple H1s: ${snapshot.h1.length}`);
  return { url: snapshot.url, title: snapshot.title, titleLength, metaDescription: snapshot.metaDescription, metaDescriptionLength, h1Count: snapshot.h1.length, h1: snapshot.h1, issues };
}

function toMarkdown(report: any): string {
  const rows = report.results.filter((row: Result) => row.issues.length > 0);
  const lines = ['# Metadata Audit', '', `Generated: ${report.generatedAt}`, `URLs audited: ${report.auditedUrls}`, `URLs with issues: ${rows.length}`, '', '| URL | Title length | Description length | H1 count | Issues |', '|---|---:|---:|---:|---|'];
  for (const row of rows) lines.push(`| ${row.url} | ${row.titleLength} | ${row.metaDescriptionLength} | ${row.h1Count} | ${row.issues.join('<br>')} |`);
  return lines.join('\n');
}

async function main() {
  const urls = await getSitemapUrls();
  const urlsToAudit = config.maxUrls > 0 ? urls.slice(0, config.maxUrls) : urls;
  const snapshots = await runWithConcurrency(urlsToAudit, crawlPage, config.concurrency);
  const results = snapshots.map(audit);
  const report = { generatedAt: new Date().toISOString(), siteUrl: config.siteUrl, sitemapUrl: config.sitemapUrl, totalUrls: urls.length, auditedUrls: results.length, issueCount: results.reduce((sum, row) => sum + row.issues.length, 0), results };
  const jsonPath = await writeJsonReport('metadata-audit', report);
  const mdPath = await writeMarkdownReport('metadata-audit', toMarkdown(report));
  console.log(`Metadata audit complete: ${report.auditedUrls}/${report.totalUrls} URLs audited`);
  console.log(`Issues found: ${report.issueCount}`);
  console.log(`Markdown report: ${mdPath}`);
  console.log(`JSON report: ${jsonPath}`);
}

main().catch((error) => { console.error(error); process.exit(1); });
