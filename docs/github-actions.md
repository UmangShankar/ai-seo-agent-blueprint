# GitHub Actions

This repo includes CI, manual SEO reporting, manual audits, and pull request QA.

## Manual Report

`SEO Manual Report` accepts a site URL, sitemap URL, and URL limit through `workflow_dispatch`. It verifies the generated reports and uploads them as workflow artifacts.

Scheduled runs are disabled by default. This prevents a newly cloned public blueprint from failing or consuming GitHub Actions minutes before a site is configured.

To enable scheduled reporting for your own repository:

1. Configure `SITE_URL`, `SITEMAP_URL`, and `SEO_AUDIT_MAX_URLS` as repository Actions variables.
2. Add a `schedule` cron trigger to `.github/workflows/seo-daily-report.yml`.
3. Update the report step to read those repository variables for scheduled runs.

Keep manual dispatch as the default unless the repository has a known site configuration.

## Manual Audit

Allows a maintainer to run the audit against a chosen site URL and max URL count.

## PR QA

Runs TypeScript checks and a limited SEO audit for pull requests.
