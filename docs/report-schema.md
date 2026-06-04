# Report Schema

All JSON reports include:

| Field | Type | Description |
|---|---|---|
| `generatedAt` | string | ISO timestamp. |
| `siteUrl` | string | Configured site origin. |
| `sitemapUrl` | string | Configured sitemap URL. |
| `totalUrls` | number | URLs discovered from the sitemap. |
| `auditedUrls` | number | URLs audited after limits are applied. |
| `issueCount` | number | Total issues found. |
| `results` | array | Per-URL audit results. |

## Canonical Audit

Each `results` item contains:

- `url`
- `status`
- `finalUrl`
- `canonicalCount`
- `canonical`
- `ogUrl`
- `robots`
- `title`
- `metaDescription`
- `h1Count`
- `issues`

## Metadata Audit

Each `results` item contains:

- `url`
- `title`
- `titleLength`
- `metaDescription`
- `metaDescriptionLength`
- `h1Count`
- `h1`
- `issues`

## Link Audit

Each `results` item contains:

- `url`
- `internalLinkCount`
- `internalLinks`
- `issues`
