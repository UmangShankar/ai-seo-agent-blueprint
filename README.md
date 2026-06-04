# AI SEO Agent Blueprint

A site-agnostic, open-source starter kit for running human-reviewed technical SEO audits against any public website with a sitemap.

The project crawls URLs from `SITEMAP_URL`, audits canonical tags, metadata, and internal links, then writes reviewable reports and an approval pack. It is designed for teams that want repeatable SEO diagnostics without auto-publishing content or tying the workflow to one website.

## Safety Model

- Report-first: scripts generate JSON and Markdown reports only.
- Human-reviewed: implementation decisions should happen in reviewed issues or pull requests.
- No auto-publishing: this repo does not publish pages, rewrite live content, or deploy anything.
- No spam tactics: do not use it for keyword stuffing, doorway pages, cloaking, or low-quality scaled content.
- No secrets: keep credentials in local environment files or GitHub Actions secrets, never in git.

## Prerequisites

- Node.js 20+
- npm
- A public website
- A sitemap URL, usually `https://your-site.com/sitemap.xml`

## Quick Start

```bash
npm install
cp .env.example .env
```

Edit `.env`:

```dotenv
SITE_URL=https://www.example.com
SITEMAP_URL=https://www.example.com/sitemap.xml
SEO_AUDIT_MAX_URLS=0
SEO_AUDIT_CONCURRENCY=5
SEO_REPORT_DIR=seo-reports
```

Run the full report and approval pack:

```bash
npm run seo:report
npm run seo:pr-pack
```

For a small local test, set `SEO_AUDIT_MAX_URLS=10` before running the report.

## Environment Variables

| Variable | Required | Default | Purpose |
|---|---:|---|---|
| `SITE_URL` | Yes | `https://example.com` | Website origin used for same-site checks. |
| `SITEMAP_URL` | Yes | `${SITE_URL}/sitemap.xml` | Sitemap or sitemap index to crawl. |
| `SEO_AUDIT_MAX_URLS` | No | `0` | Maximum URLs to audit. `0` means all discovered URLs. |
| `SEO_AUDIT_CONCURRENCY` | No | `5` | Number of pages fetched at the same time. |
| `SEO_REPORT_DIR` | No | `seo-reports` | Local output directory for generated reports. |

## Commands

```bash
npm run seo:canonical-audit
npm run seo:metadata-audit
npm run seo:link-audit
npm run seo:report
npm run seo:pr-pack
npm run seo:post-implementation-qa
npm test
npm run lint
npm run ci
```

## Generated Outputs

Generated reports are written locally and intentionally ignored by git:

- `seo-reports/canonical-audit.json`
- `seo-reports/canonical-audit.md`
- `seo-reports/metadata-audit.json`
- `seo-reports/metadata-audit.md`
- `seo-reports/link-audit.json`
- `seo-reports/link-audit.md`
- `seo-reports/approval-pack.md`

Keep `seo-reports/.gitkeep` committed so the directory exists after clone.

## GitHub Actions Setup

Set repository variables in GitHub under `Settings -> Secrets and variables -> Actions -> Variables`:

- `SITE_URL`, for example `https://your-site.com`
- `SITEMAP_URL`, for example `https://your-site.com/sitemap.xml`
- `SEO_AUDIT_MAX_URLS`, for example `100`

The workflows run CI, scheduled reports, manual audits, and PR QA. Generated `seo-reports` files are uploaded as workflow artifacts rather than committed.

## Common Workflows

- Local audit: configure `.env`, run `npm run seo:report`, then inspect `seo-reports`.
- Scheduled audit: configure repository variables and let `SEO Daily Report` upload artifacts.
- Manual audit: run `SEO Manual Audit` from GitHub Actions with explicit inputs.
- PR QA: pull requests to `main` run linting, tests, and a limited canonical smoke audit.
- Coding-agent assisted implementation: use generated reports as input, ask an agent to propose changes, then review and approve the PR manually.

## Docs

- [Setup](docs/setup.md)
- [Troubleshooting](docs/troubleshooting.md)
- [Using with coding agents](docs/using-with-coding-agents.md)
- [Report schema](docs/report-schema.md)
- [Generated report files](docs/examples/generated-report-files.md)
- [Future improvements](docs/roadmap/future-improvements.md)
- [Architecture](docs/architecture.md)
- [GitHub Actions](docs/github-actions.md)
- [Safety principles](docs/safety-principles.md)

## Contributing and Security

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening changes. Report security issues using [SECURITY.md](SECURITY.md).

## License

MIT
