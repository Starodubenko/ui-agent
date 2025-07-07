import { useEffect, useState } from "react";

import * as babel from "@babel/standalone";

function parseImports(code: string): { spec: string; source: string }[] {
  const regex = /^import\s+(.*?)\s+from\s+['"](.+?)['"];?/gm;
  const results = [];
  let match;
  while ((match = regex.exec(code))) {
    results.push({ spec: match[1].trim(), source: match[2].trim() });
  }
  return results;
}

function buildImportBlock(imports: { spec: string; source: string }[]) {
  return imports
    .map(({ source }) => {
      const alias = sanitizeImport(source);
      return `import * as ${alias} from 'https://esm.sh/${source}?dev';`;
    })
    .join("\n");
}

export function stripImports(code: string) {
  return code
    .split("\n")
    .filter((line) => !line.trim().startsWith("import"))
    .join("\n");
}

function sanitizeImport(name: string): string {
  return name.replace(/[^a-zA-Z0-9]/g, "_");
}

function patchIdentifiers(
  code: string,
  imports: { spec: string; source: string }[]
) {
  let patched = code;
  for (const { spec, source } of imports) {
    const alias = sanitizeImport(source);

    if (spec.startsWith("{")) {
      const names = spec
        .replace("{", "")
        .replace("}", "")
        .split(",")
        .map((s) => s.trim());
      for (const name of names) {
        const re = new RegExp(`\\b${name}\\b`, "g");
        patched = patched.replace(re, `${alias}.${name}`);
      }
    } else {
      const re = new RegExp(`\\b${spec}\\b`, "g");
      patched = patched.replace(re, `${alias}.default`);
    }
  }
  return patched;
}

export function transpileWithBabel(code: string): string {
  return babel.transform(code, {
    presets: [
      ["env", { modules: false, targets: { esmodules: true } }],
      ["react", { runtime: "automatic", importSource: "react" }],
      "typescript",
    ],
    sourceType: "module",
    filename: "usercode.tsx",
    configFile: false,
    babelrc: false,
  }).code!;
}

function fixJsxRuntimeImport(code: string): string {
  return code.replace(
    /from\s+["']react\/jsx-runtime["']/g,
    'from "https://esm.sh/react/jsx-runtime?dev"'
  );
}

const getCodeToInject = (code: string) => {
  const imports = parseImports(code);
  const importBlock = buildImportBlock(imports);
  const codeWithoutImports = stripImports(code);
  const patchedCode = patchIdentifiers(codeWithoutImports, imports);
  const finalCode = `${importBlock}\n\n${patchedCode}`;
  const transpiledRaw = transpileWithBabel(finalCode);
  return fixJsxRuntimeImport(transpiledRaw);
};

export function useTranspile(
  code: string,
  iframeRef: React.RefObject<HTMLIFrameElement | null>
) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.data?.__sandbox_status) return;
      setStatus(e.data.status);
      setError(e.data.error ?? null);
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    const process = async () => {
      setStatus("loading");
      setError(null);

      try {
        const iframeCode = getCodeToInject(code);

        
          setStatus("success");
          iframeRef.current?.contentWindow?.postMessage(
            { transpiled: iframeCode },
            "*"
          );
        
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
          setStatus("error");
          setError("Ошибка компиляции: " + (e?.message || e));
          iframeRef.current?.contentWindow?.postMessage(
            { __force_error: true, error: String(e) },
            "*"
          );
      }
    };

    process();
    return () => {
      
    };
  }, [code, iframeRef]);

  return { status, error };
}
