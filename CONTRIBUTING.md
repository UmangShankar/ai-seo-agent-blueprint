# Contributing

Thanks for improving the AI SEO Agent Blueprint. Keep changes site-agnostic, report-first, and safe for public open-source use.

## Local Setup

```bash
npm install
cp .env.example .env
```

Set `SITE_URL` and `SITEMAP_URL` in `.env` for a public website you control or have permission to audit.

## Validation

Run these before opening a pull request:

```bash
npm run lint
npm test
npm run ci
```

For SEO behavior changes, also run a limited audit:

```bash
npm run seo:report
npm run seo:pr-pack
```

## Safety Principles

- Keep the project report-first and human-reviewed.
- Do not add auto-publishing features without explicit review and a clear safety model.
- Do not add keyword stuffing, spam generation, doorway page, cloaking, or scaled low-quality content features.
- Do not hardcode a specific website. Use `SITE_URL` and `SITEMAP_URL`.
- Do not commit generated `seo-reports` files.
- Do not commit credentials, tokens, cookies, private URLs, or customer data.

## Pull Requests

Use the pull request template. Include a summary, validation commands, and any safety considerations.
