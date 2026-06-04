import { config } from './shared/config';
import { crawlPage } from './shared/crawler';
import { getSitemapUrls } from './shared/sitemap';
import { runWithConcurrency } from './shared/concurrency';
import { writeJsonReport, writeMarkdownReport } from './shared/report';
import { normaliseUrl, sameUrl } from './shared/url';

type Result = {
  url: string;
  status: number | null;
  finalUrl: string | null;
  canonicalCount: number;
  canonical: string | null;
  ogUrl: string | null;
  robots: string | null;
  title: string | null;
  metaDescription: string | null;
  h1Count: number;
  issues: string[];
};

function toMarkdown(report: any): string {
  const issueRows = report.results.filter((row: Result) => row.issues.length > 0);
  const lines = [
    '# Sitewide Canonical Audit',
    '',
    `Generated: ${report.generatedAt}`,
    `Site URL: ${report.siteUrl}`,
    `Sitemap: ${report.sitemapUrl}`,
    `URLs audited: ${report.auditedUrls}`,
    `URLs with issues: ${issueRows.length}`,
    `Total issues: ${report.issueCount}`,
    '',
    '| URL | Status | Canonical | og:url | Issues |',
    '|---|---:|---|---|---|'
  ];

  for (const row of issueRows) {
    lines.push(`| ${row.url} | ${row.status ?? 'n/a'} | ${row.canonical ?? 'n/a'} | ${row.ogUrl ?? 'n/a'} | ${row.issues.join('<br>')} |`);
  }

  return lines.join('\n');
}

async function main() {
  const urls = await getSitemapUrls();
  const urlsToAudit = config.maxUrls > 0 ? urls.slice(0, config.maxUrls) : urls;
  const snapshots = await runWithConcurrency(urlsToAudit, crawlPage, config.concurrency);
  const homepage = normaliseUrl(config.siteUrl);

  const results: Result[] = snapshots.map((snapshot) => {
    const issues: string[] = [];
    const finalUrl = normaliseUrl(snapshot.finalUrl);
    const sitemapUrl = normaliseUrl(snapshot.url);

    if (snapshot.status !== 200) issues.push(`Non-200 status: ${snapshot.status}`);
    if (!sameUrl(sitemapUrl, finalUrl)) issues.push(`Sitemap URL redirects to ${snapshot.finalUrl}`);
    if (snapshot.canonicalValues.length === 0) issues.push('Missing canonical tag');
    if (snapshot.canonicalValues.length > 1) issues.push(`Multiple canonical tags: ${snapshot.canonicalValues.length}`);
    if (snapshot.canonical && finalUrl && !sameUrl(snapshot.canonical, finalUrl)) issues.push('Canonical does not match final URL');
    if (snapshot.canonical && sameUrl(snapshot.canonical, homepage) && !sameUrl(finalUrl, homepage)) issues.push('Canonical unexpectedly points to homepage');
    if (snapshot.ogUrl && snapshot.canonical && !sameUrl(snapshot.ogUrl, snapshot.canonical)) issues.push('og:url does not match canonical');
    if (snapshot.robots && /noindex/i.test(snapshot.robots)) issues.push(`Public sitemap URL has noindex robots: ${snapshot.robots}`);

    return {
      url: snapshot.url,
      status: snapshot.status,
      finalUrl: snapshot.finalUrl,
      canonicalCount: snapshot.canonicalValues.length,
      canonical: snapshot.canonical,
      ogUrl: snapshot.ogUrl,
      robots: snapshot.robots,
      title: snapshot.title,
      metaDescription: snapshot.metaDescription,
      h1Count: snapshot.h1.length,
      issues
    };
  });

  const report = {
    generatedAt: new Date().toISOString(),
    siteUrl: config.siteUrl,
    sitemapUrl: config.sitemapUrl,
    totalUrls: urls.length,
    auditedUrls: results.length,
    issueCount: results.reduce((sum, row) => sum + row.issues.length, 0),
    results
  };

  const jsonPath = await writeJsonReport('canonical-audit', report);
  const mdPath = await writeMarkdownReport('canonical-audit', toMarkdown(report));

  console.log(`Canonical audit complete: ${report.auditedUrls}/${report.totalUrls} URLs audited`);
  console.log(`Issues found: ${report.issueCount}`);
  console.log(`Markdown report: ${mdPath}`);
  console.log(`JSON report: ${jsonPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
