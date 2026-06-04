# Governance

This project is an open-source SEO agent blueprint. Anyone can fork the repository, open issues, and propose pull requests.

## Maintainers

Only maintainers can merge changes into the upstream repository. Maintainers are responsible for reviewing contributions, preserving the safety model, and keeping the project site-agnostic.

The `main` branch should be protected. Pull requests should pass CI before merge.

## Contributor Expectations

Contributors should follow [CONTRIBUTING.md](../CONTRIBUTING.md) and [SECURITY.md](../SECURITY.md).

Contributions must not:

- Add secrets, credentials, cookies, private URLs, or customer data.
- Add auto-publishing behavior.
- Add SEO spam features, doorway pages, keyword stuffing, hidden text, cloaking, or scaled low-quality content workflows.
- Commit generated `seo-reports` output files.
- Hardcode a specific website into source, docs, examples, or workflows.

The project should remain report-first, human-reviewed, and safe to run against any public website with a sitemap.
