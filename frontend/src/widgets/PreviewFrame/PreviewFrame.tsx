import React, { type FC } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import * as MaterialUI from "@mui/material";
import * as Icons from "@mui/icons-material";

export type PreviewFrameProps = { code: string };

function stripImports(code: string): string {
  return code.replace(/import[^;]+;?\\n?/g, "");
}

export const PreviewFrame: FC<PreviewFrameProps> = ({ code }) => {
  const codeClean = stripImports(code);
  return (
    <LiveProvider code={codeClean} scope={{ React, ...MaterialUI, ...Icons }}>
      <LiveEditor />
      <LiveError />
      <div style={{ marginTop: 16, border: "1px solid #eee", borderRadius: 6, padding: 8 }}>
        <LivePreview />
      </div>
    </LiveProvider>
  );
};
