# AI SEO Agent Blueprint

A reusable starter kit for a human-reviewed technical SEO audit pipeline.

It helps website teams crawl their sitemap, audit canonical tags, review metadata, inspect internal links, generate reports, and produce approval packs before any implementation work is done.

## Features

- Sitemap discovery
- Page crawler
- Canonical audit
- Metadata audit
- Internal link audit
- Combined SEO report runner
- Human approval pack generator
- GitHub Actions examples
- Safety and architecture documentation

## Quick start

```bash
npm install
cp .env.example .env
npm run seo:canonical-audit
npm run seo:metadata-audit
npm run seo:link-audit
npm run seo:report
npm run seo:pr-pack
```

Run against your own site:

```bash
SITE_URL=https://www.example.com SITEMAP_URL=https://www.example.com/sitemap.xml npm run seo:canonical-audit
```

Limit a crawl:

```bash
SEO_AUDIT_MAX_URLS=10 npm run seo:report
```

## Architecture

```text
Trigger -> Sitemap discovery -> Crawler -> Audit agents -> Reports -> Approval pack -> Reviewed PR -> QA -> Monitor
```

## Safety model

The project is report-first. It does not change website content or publish changes by itself. Use the reports to create reviewed pull requests.

## License

MIT
