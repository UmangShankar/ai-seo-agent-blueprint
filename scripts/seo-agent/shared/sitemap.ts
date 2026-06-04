import { XMLParser } from 'fast-xml-parser';
import { config } from './config';
import { fetchText } from './fetch';

type ParsedSitemap = {
  urlset?: { url?: SitemapEntry | SitemapEntry[] };
  sitemapindex?: { sitemap?: SitemapEntry | SitemapEntry[] };
};

type SitemapEntry = {
  loc?: string;
};

function toArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function locValues(entries: SitemapEntry | SitemapEntry[] | undefined): string[] {
  return toArray(entries)
    .map((entry) => entry.loc)
    .filter((loc): loc is string => typeof loc === 'string' && loc.trim().length > 0)
    .map((loc) => loc.trim());
}

async function collectSitemapUrls(sitemapUrl: string, seen: Set<string>): Promise<string[]> {
  if (seen.has(sitemapUrl)) return [];
  seen.add(sitemapUrl);

  let text: string;
  let status: number;
  try {
    const fetched = await fetchText(sitemapUrl);
    text = fetched.text;
    status = fetched.status;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch sitemap ${sitemapUrl}: ${message}`);
  }

  if (status >= 400) {
    throw new Error(`Failed to fetch sitemap ${sitemapUrl}: HTTP ${status}`);
  }

  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(text) as ParsedSitemap;
  const urls = locValues(parsed?.urlset?.url);
  if (urls.length > 0) return urls;

  const nestedSitemaps = locValues(parsed?.sitemapindex?.sitemap);
  if (nestedSitemaps.length === 0) return [];

  const nestedUrls = await Promise.all(nestedSitemaps.map((nestedUrl) => collectSitemapUrls(nestedUrl, seen)));
  return nestedUrls.flat();
}

export async function getSitemapUrls(sitemapUrl = config.sitemapUrl): Promise<string[]> {
  return [...new Set(await collectSitemapUrls(sitemapUrl, new Set<string>()))];
}
