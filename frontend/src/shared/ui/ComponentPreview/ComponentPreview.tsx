import type { FC } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { componentPreviewRootSx } from "./componentPreviewStyles";
import { Sandpack } from "@codesandbox/sandpack-react";

export type ComponentPreviewProps = {
  code: string;
};

export const ComponentPreview: FC<ComponentPreviewProps> = ({ code }) => {
  const theme = useTheme();
  return (
    <Box sx={componentPreviewRootSx(theme)}>
      <Typography variant="subtitle1" mb={1}>
        Превью компонента
      </Typography>
      <Sandpack
        template="react-ts"
        files={{
          "/App.tsx": code,
        }}
        customSetup={{
          dependencies: {
            "@emotion/react": "^11",
            "@emotion/styled": "^11",
            "@mui/icons-material": "^7",
            "@mui/material": "^7",
            react: "^19.1.0",
            "react-dom": "^19.1.0",
            "react-router-dom": "^7.6.3",
            zustand: "^5.0.5",
          },
        }}
        options={{
          showLineNumbers: true,
          showTabs: false,
          editorHeight: 220,
          previewHeight: 220,
        }}
      />
    </Box>
  );
};
