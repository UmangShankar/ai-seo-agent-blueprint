import { config } from './config';

export function normaliseUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const parsed = new URL(value, config.siteUrl);
    parsed.hash = '';
    return parsed.toString().replace(/\/$/, '');
  } catch {
    return value.trim();
  }
}

export function sameUrl(a: string | null | undefined, b: string | null | undefined): boolean {
  return normaliseUrl(a) === normaliseUrl(b);
}

export function isInternalUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  try {
    const parsed = new URL(value, config.siteUrl);
    return parsed.origin === new URL(config.siteUrl).origin;
  } catch {
    return false;
  }
}
