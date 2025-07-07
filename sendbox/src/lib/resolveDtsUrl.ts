export async function resolveDtsUrl(pkg: string): Promise<string | null> {
  try {
    if (pkg === "react-dom/client") {
      return "https://unpkg.com/react-dom@latest/client/index.d.ts";
    }

    const metaRes = await fetch(`https://registry.npmjs.org/${pkg}`);
    if (!metaRes.ok) return null;

    const meta = await metaRes.json();
    const version = meta["dist-tags"]?.latest || "latest";
    const types = meta.versions?.[version]?.types || meta.versions?.[version]?.typings;

    if (types) {
      return `https://unpkg.com/${pkg}@${version}/${types}`;
    }

    // Попробуем @types/*
    const scoped = pkg.startsWith("@") ? pkg.replace("@", "").replace("/", "__") : pkg;
    const typesPkg = `@types/${scoped}`;

    const headRes = await fetch(`https://unpkg.com/${typesPkg}/index.d.ts`, { method: "HEAD" });
    if (headRes.ok) {
      return `https://unpkg.com/${typesPkg}/index.d.ts`;
    }

    return null;
  } catch {
    return null;
  }
}
