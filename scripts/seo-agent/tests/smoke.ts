import { getSitemapUrls } from '../shared/sitemap';

async function main() {
  const urls = await getSitemapUrls();
  if (!Array.isArray(urls)) throw new Error('Sitemap parser did not return an array');
  console.log(`Smoke test passed. Sitemap URLs discovered: ${urls.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
