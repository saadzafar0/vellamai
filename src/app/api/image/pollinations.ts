export function buildPollinationsUrl(prompt: string, width = 1024, height = 1024) {
  const encoded = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}`;
}

export async function fetchPollinationsImage(prompt: string) {
  const url = buildPollinationsUrl(prompt);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Pollinations fetch failed: ${response.status}`);
  }
  return url;
}
