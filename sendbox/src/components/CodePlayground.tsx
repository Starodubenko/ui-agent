import Editor, { useMonaco } from "@monaco-editor/react";
import { useAutoTypeLoader } from "hooks/useAutoTypeLoader";
import { useTranspile } from "hooks/useTranspileWithTypes";
import React, { useEffect, useRef, useState } from "react";
import { IFRAME_HTML } from "./iframeHtml";

const getCode = (code: string) => `
import { createRoot } from 'react-dom/client';

${code}

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);
`.trim();

const INITIAL_CODE = `
import React from "react";
import { Button } from "@mui/material";
import groupby from 'lodash.groupby'

const Counter = () => {
  const [count, setCount] = React.useState(0);

  groupby(1,2,3)

  return (
    <Button variant="contained" onClick={() => setCount(count + 1)}>
      Кликнули: {count}
    </Button>
  );
};

function App() {
  return <Counter />;
}
`.trim();

type Props = { inputCode?: string};

export const CodePlayground: React.FC<Props> = ({ inputCode }) => {
  const [code, setCode] = useState(getCode(INITIAL_CODE));
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (inputCode) {
      setCode(getCode(inputCode));
    }
  }, [inputCode])

  // --- инициализация monaco через useMonaco() ---
  const monaco = useMonaco();
  useAutoTypeLoader(code, monaco);
  const {status, error } = useTranspile(code, iframeRef);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "50%", minWidth: 360, padding: 0 }}>
        <Editor
          height="100%"
          defaultLanguage="typescript"
          defaultPath="file:///main.tsx"
          value={code}
          onChange={val => val !== undefined && setCode(val)}
          theme="vs-dark"
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            fontFamily: "JetBrains Mono, Fira Mono, Consolas, monospace",
            wordWrap: "on",
            tabSize: 2,
            formatOnType: true,
            formatOnPaste: true,
            smoothScrolling: true,
            scrollBeyondLastLine: false,
          }}
        />
      </div>
      <div style={{ flex: 1, borderLeft: "1px solid #23232e", background: "#191b20", display: "flex", flexDirection: "column" }}>
        <div style={{ minHeight: 36, display: "flex", alignItems: "center", padding: "0 20px", borderBottom: "1px solid #23232e", background: "#181a22" }}>
          <div style={{
            width: 16, height: 16, borderRadius: 8, marginRight: 10,
            background: status === "loading" ? "#ff9900" : status === "ready" ? "#00c971" : status === "error" ? "#e94343" : "#aaa",
            boxShadow: `0 0 8px ${status === "loading" ? "#ff9900" : status === "ready" ? "#00c971" : status === "error" ? "#e94343" : "#aaa"}`
          }} />
          <span style={{ color: "#fff", fontWeight: 500, fontSize: 16 }}>
            {status === "loading" && "Загрузка…"}
            {status === "ready" && "Готово"}
            {status === "error" && "Ошибка"}
            {status === "idle" && "Нет кода"}
          </span>
          {error && <span style={{ color: "#f55", marginLeft: 16, fontSize: 15 }}>{error}</span>}
        </div>
        <div style={{ flex: 1 }}>
          <iframe
            ref={iframeRef}
            title="Preview"
            style={{ width: "100%", height: "100%", border: "none", background: "#181924" }}
            srcDoc={IFRAME_HTML}
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
};


