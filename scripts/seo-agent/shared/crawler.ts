import * as cheerio from 'cheerio';
import { fetchText } from './fetch';
import { normaliseUrl, isInternalUrl } from './url';

export type PageSnapshot = {
  url: string;
  status: number | null;
  finalUrl: string | null;
  title: string | null;
  metaDescription: string | null;
  canonicalValues: string[];
  canonical: string | null;
  ogUrl: string | null;
  robots: string | null;
  h1: string[];
  internalLinks: string[];
};

export async function crawlPage(url: string): Promise<PageSnapshot> {
  try {
    const { status, finalUrl, text } = await fetchText(url);
    const $ = cheerio.load(text);

    const canonicalValues = $('link[rel="canonical"]')
      .map((_, element) => $(element).attr('href')?.trim())
      .get()
      .filter(Boolean);

    const internalLinks = $('a[href]')
      .map((_, element) => $(element).attr('href')?.trim())
      .get()
      .filter((href): href is string => Boolean(href))
      .filter(isInternalUrl)
      .map((href) => normaliseUrl(href))
      .filter((href): href is string => Boolean(href));

    return {
      url,
      status,
      finalUrl,
      title: $('title').first().text().trim() || null,
      metaDescription: $('meta[name="description"]').attr('content')?.trim() || null,
      canonicalValues,
      canonical: normaliseUrl(canonicalValues[0]),
      ogUrl: normaliseUrl($('meta[property="og:url"]').attr('content')),
      robots: $('meta[name="robots"]').attr('content')?.trim() || null,
      h1: $('h1')
        .map((_, element) => $(element).text().replace(/\s+/g, ' ').trim())
        .get()
        .filter(Boolean),
      internalLinks: [...new Set(internalLinks)]
    };
  } catch {
    return {
      url,
      status: null,
      finalUrl: null,
      title: null,
      metaDescription: null,
      canonicalValues: [],
      canonical: null,
      ogUrl: null,
      robots: null,
      h1: [],
      internalLinks: []
    };
  }
}
