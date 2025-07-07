import { useEffect, useRef, useState, type FC } from "react";
import { Box, useTheme } from "@mui/material";
import { codeBlockRootSx } from "./codeBlockStyles";

export type CodeBlockProps = {
  code: string;
  language?: string;
};

export const CodeBlock: FC<CodeBlockProps> = ({ code }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const theme = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeLoaded) {
      iframeRef.current?.contentWindow?.postMessage({ code }, "*");
    }
  }, [code, iframeLoaded]);

  return (
    <Box component="pre" sx={codeBlockRootSx(theme)}>
      <iframe
        ref={iframeRef}
        src="http://localhost:3002"
        title="Sandbox"
        style={{ width: "800px", height: "400px", border: "none" }}
        sandbox="allow-scripts allow-same-origin allow-modals allow-forms allow-downloads"
        onLoad={() => setIframeLoaded(true)}
      ></iframe>
    </Box>
  );
};
