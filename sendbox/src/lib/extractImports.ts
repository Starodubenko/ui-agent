export function extractImports(code: string): string[] {
  const importRegex = /from\s+["']([^"']+)["']/g;
  const imports = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = importRegex.exec(code))) {
    let raw = match[1];
    if (raw.startsWith(".")) continue;
    if (raw.startsWith("@")) {
      const segments = raw.split("/");
      imports.add(`${segments[0]}/${segments[1]}`);
    } else {
      imports.add(raw.split("/")[0]);
    }
  }

  return Array.from(imports);
}
