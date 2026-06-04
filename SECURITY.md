# Security

## Supported Use

This project is a report-only SEO audit blueprint. It should run against public URLs from a configured sitemap and write local reports.

## Credentials

- Do not commit credentials, API keys, cookies, private sitemap URLs, or customer data.
- Keep local configuration in `.env`, which is ignored by git.
- If Google Search Console, analytics APIs, CMS APIs, or other integrations are added later, credentials must be provided through environment variables or GitHub Actions secrets.

## Reporting Vulnerabilities

Please report security issues privately to the repository owner. Do not open a public issue with exploit details, credentials, or private site data.

Include:

- A concise description of the issue.
- Steps to reproduce.
- Impact and affected files or commands.
- Any safe remediation ideas.
