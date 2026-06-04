export const DEFAULT_SITE_URL = 'https://example.com';

export const config = {
  siteUrl: (process.env.SITE_URL || process.env.SEO_AUDIT_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, ''),
  sitemapUrl:
    process.env.SITEMAP_URL ||
    process.env.SEO_AUDIT_SITEMAP_URL ||
    `${(process.env.SITE_URL || process.env.SEO_AUDIT_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '')}/sitemap.xml`,
  reportDir: process.env.SEO_REPORT_DIR || 'seo-reports',
  maxUrls: Number.parseInt(process.env.SEO_AUDIT_MAX_URLS || '0', 10),
  concurrency: Math.max(1, Number.parseInt(process.env.SEO_AUDIT_CONCURRENCY || '5', 10))
};
