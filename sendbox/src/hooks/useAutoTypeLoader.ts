// src/hooks/useAutoTypeLoader.ts
import { useEffect, useState } from "react";
import type * as monacoType from "monaco-editor";
import { extractImports } from "../lib/extractImports";
import { resolveDtsUrl } from "../lib/resolveDtsUrl";
import { fetchDtsFile } from "../lib/fetchDtsFile";

export function useAutoTypeLoader(code: string, monaco: typeof monacoType | null) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!monaco || !code) return;

    const loadTypes = async () => {
      setLoading(true);

      const baseImports = new Set([
        "react",
        "react-dom",
        "react-dom/client",
        "@types/react",
        "@types/react-dom",
      ]);

      const userImports = extractImports(code);
      for (const imp of userImports) baseImports.add(imp);

      for (const pkg of baseImports) {
        const url = await resolveDtsUrl(pkg);
        if (!url) continue;

        const dts = await fetchDtsFile(url);
        if (!dts) continue;

        const path = `file:///node_modules/${pkg}/index.d.ts`;
        monaco.languages.typescript.typescriptDefaults.addExtraLib(dts, path);

        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          dts,
          `file:///node_modules/@types/react-dom/index.d.ts`
        );
      
        // 👇 вручную добавляем alias для react-dom/client
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          `export * from "react-dom";`,
          `file:///node_modules/react-dom/client/index.d.ts`
        );

        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          `
            import { createRoot, hydrateRoot } from "react-dom";
            export { createRoot, hydrateRoot };
          `,
          "file:///node_modules/react-dom/client/index.d.ts"
        );
      }

      // Важно: для корректного резолвинга
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        target: monaco.languages.typescript.ScriptTarget.ESNext,
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
        module: monaco.languages.typescript.ModuleKind.ESNext,
        jsx: monaco.languages.typescript.JsxEmit.React,
        typeRoots: ["node_modules/@types"],
      });

      setLoading(false);
    };

    loadTypes();
  }, [code, monaco]);

  return loading;
}
