# Using with Coding Agents

This blueprint is safe input for coding agents because it produces reviewable reports instead of publishing changes.

## Codex

Ask Codex to read `seo-reports/approval-pack.md` and propose a scoped implementation branch. Require tests and a human-reviewed pull request before merging.

## Claude Code

Provide the generated Markdown reports as context. Ask for small, reviewable changes and require the agent to avoid committing generated reports or secrets.

## Cursor

Use reports as implementation notes inside the editor. Keep changes limited to source files and review diffs manually.

## Human Developers

Treat each approval-pack item as a review task. Confirm the SEO recommendation makes sense for the specific site before implementing it.

## Guardrails

- Do not ask agents to auto-publish content.
- Do not provide private credentials in prompts.
- Do not commit generated `seo-reports` output.
- Do not accept spam, doorway page, or keyword stuffing recommendations.
