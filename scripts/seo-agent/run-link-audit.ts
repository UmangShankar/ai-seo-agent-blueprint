import { config } from './shared/config';
import { crawlPage } from './shared/crawler';
import { getSitemapUrls } from './shared/sitemap';
import { runWithConcurrency } from './shared/concurrency';
import { writeJsonReport, writeMarkdownReport } from './shared/report';

type Result = { url: string; internalLinkCount: number; internalLinks: string[]; issues: string[] };

function audit(snapshot: Awaited<ReturnType<typeof crawlPage>>): Result {
  const issues: string[] = [];
  if (snapshot.internalLinks.length < 3) issues.push(`Low internal link count: ${snapshot.internalLinks.length}`);
  return { url: snapshot.url, internalLinkCount: snapshot.internalLinks.length, internalLinks: snapshot.internalLinks, issues };
}

function toMarkdown(report: any): string {
  const rows = report.results.filter((row: Result) => row.issues.length > 0);
  const lines = ['# Internal Link Audit', '', `Generated: ${report.generatedAt}`, `URLs audited: ${report.auditedUrls}`, `URLs with issues: ${rows.length}`, '', '| URL | Internal links | Issues |', '|---|---:|---|'];
  for (const row of rows) lines.push(`| ${row.url} | ${row.internalLinkCount} | ${row.issues.join('<br>')} |`);
  return lines.join('\n');
}

async function main() {
  const urls = await getSitemapUrls();
  const urlsToAudit = config.maxUrls > 0 ? urls.slice(0, config.maxUrls) : urls;
  const snapshots = await runWithConcurrency(urlsToAudit, crawlPage, config.concurrency);
  const results = snapshots.map(audit);
  const report = { generatedAt: new Date().toISOString(), siteUrl: config.siteUrl, sitemapUrl: config.sitemapUrl, totalUrls: urls.length, auditedUrls: results.length, issueCount: results.reduce((sum, row) => sum + row.issues.length, 0), results };
  const jsonPath = await writeJsonReport('link-audit', report);
  const mdPath = await writeMarkdownReport('link-audit', toMarkdown(report));
  console.log(`Internal link audit complete: ${report.auditedUrls}/${report.totalUrls} URLs audited`);
  console.log(`Issues found: ${report.issueCount}`);
  console.log(`Markdown report: ${mdPath}`);
  console.log(`JSON report: ${jsonPath}`);
}

main().catch((error) => { console.error(error); process.exit(1); });
