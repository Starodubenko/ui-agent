export async function fetchDtsFile(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;

    const text = await res.text();
    if (!text.trim() || text.includes("404") || text.length < 50) return null;

    return text;
  } catch {
    return null;
  }
}
