# Architecture

The AI SEO Agent Blueprint is a modular, human-reviewed SEO automation system.

## Flow

```text
Trigger
-> Sitemap discovery
-> Page crawl
-> Canonical audit
-> Metadata audit
-> Link audit
-> Strategy report
-> Human approval pack
-> Reviewed implementation PR
-> PR QA
-> Production monitoring
```

## Trigger types

| Trigger | Purpose |
|---|---|
| Scheduled GitHub Action | Daily or weekly monitoring |
| Manual GitHub Action | On-demand full audit |
| PR event | Validate SEO impact before merge |
| Human prompt | Create focused implementation PRs |

## Key design choice

The system is report-first. It does not automatically rewrite pages or publish generated content.
