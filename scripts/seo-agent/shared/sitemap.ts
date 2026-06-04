import { XMLParser } from 'fast-xml-parser';
import { config } from './config';
import { fetchText } from './fetch';

export async function getSitemapUrls(): Promise<string[]> {
  const { text } = await fetchText(config.sitemapUrl);
  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(text);
  const entries = parsed?.urlset?.url;
  const rawUrls = Array.isArray(entries) ? entries : entries ? [entries] : [];

  return rawUrls
    .map((entry) => entry?.loc)
    .filter((loc): loc is string => typeof loc === 'string' && loc.length > 0);
}
