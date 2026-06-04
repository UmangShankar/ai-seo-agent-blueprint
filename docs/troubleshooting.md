# Troubleshooting

## Zero URLs Found

Confirm `SITEMAP_URL` points to XML that contains either `<urlset>` entries or a `<sitemapindex>`. Run `npm test` to verify the parser returns an array.

## Sitemap Blocked

Some sites block automated fetches. Confirm the sitemap is publicly reachable in a browser and by command-line tools. If the server blocks requests, update the site allowlist or test with another public sitemap.

## Sitemap Index vs URL Set

The parser supports both standard `urlset` files and recursive `sitemapindex` files. If an index references nested sitemaps that return errors, the command reports the nested sitemap URL that failed.

## Fetch Errors

Check network access, URL spelling, HTTPS redirects, and HTTP status codes. The sitemap fetch error includes the URL and status or network message.

## Missing Generated Reports

Run `npm run seo:report` before `npm run seo:pr-pack`. The full report should create canonical, metadata, and link audit files in `seo-reports`.

## TypeScript or Lint Errors

Run:

```bash
npm run lint
```

Fix reported TypeScript errors before running CI.

## GitHub Actions Variable Mistakes

Check repository variables, not environment secrets, for `SITE_URL`, `SITEMAP_URL`, and `SEO_AUDIT_MAX_URLS`. Missing or invalid variables commonly cause audits to run against defaults or fail to fetch the sitemap.
