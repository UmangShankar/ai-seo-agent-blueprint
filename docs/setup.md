# Setup

## Install

```bash
npm install
cp .env.example .env
```

Use Node.js 20 or newer.

## Environment Variables

Set these in `.env` for local use:

```dotenv
SITE_URL=https://www.example.com
SITEMAP_URL=https://www.example.com/sitemap.xml
SEO_AUDIT_MAX_URLS=0
SEO_AUDIT_CONCURRENCY=5
SEO_REPORT_DIR=seo-reports
```

`SITE_URL` should be the public site origin. `SITEMAP_URL` can point to a standard `urlset` sitemap or a `sitemapindex`.

## Local Run

```bash
npm run seo:report
npm run seo:pr-pack
```

Reports are written to `seo-reports` and are ignored by git.

## GitHub Actions Variables

In GitHub, open `Settings -> Secrets and variables -> Actions -> Variables` and set:

- `SITE_URL`
- `SITEMAP_URL`
- `SEO_AUDIT_MAX_URLS`

Use Actions secrets only for future private API integrations. Public site URLs do not need secrets.
