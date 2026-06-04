import { createServer } from 'node:http';
import { getSitemapUrls } from '../shared/sitemap';

async function main() {
  let baseUrl = '';
  const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'application/xml');
    if (request.url === '/sitemap.xml') {
      response.end(`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex>
  <sitemap><loc>${baseUrl}/sitemap-a.xml</loc></sitemap>
  <sitemap><loc>${baseUrl}/sitemap-b.xml</loc></sitemap>
</sitemapindex>`);
      return;
    }

    if (request.url === '/sitemap-a.xml') {
      response.end(`<?xml version="1.0" encoding="UTF-8"?>
<urlset>
  <url><loc>https://example.com/page-a</loc></url>
  <url><loc>https://example.com/page-b</loc></url>
</urlset>`);
      return;
    }

    if (request.url === '/sitemap-b.xml') {
      response.end(`<?xml version="1.0" encoding="UTF-8"?>
<urlset>
  <url><loc>https://example.com/page-b</loc></url>
  <url><loc>https://example.com/page-c</loc></url>
</urlset>`);
      return;
    }

    response.statusCode = 404;
    response.end('');
  });

  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Could not start local smoke test server');
  baseUrl = `http://127.0.0.1:${address.port}`;

  const urls = await getSitemapUrls(`${baseUrl}/sitemap.xml`);
  server.close();

  if (!Array.isArray(urls)) throw new Error('Sitemap parser did not return an array');
  if (urls.length !== 3) throw new Error(`Expected 3 deduplicated URLs, found ${urls.length}`);
  console.log(`Smoke test passed. Sitemap URLs discovered: ${urls.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
