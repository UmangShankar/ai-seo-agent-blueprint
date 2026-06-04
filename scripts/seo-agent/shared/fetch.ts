export type FetchedPage = {
  status: number;
  finalUrl: string;
  text: string;
};

export async function fetchText(url: string): Promise<FetchedPage> {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: {
      'User-Agent': 'AI SEO Agent Blueprint'
    }
  });

  return {
    status: response.status,
    finalUrl: response.url,
    text: await response.text()
  };
}
