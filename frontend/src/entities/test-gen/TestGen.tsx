import React, { type FC } from "react";
import { Button, Paper, Typography } from "@mui/material";
import AceEditor from "react-ace";
import 'ace-builds';
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-tsx";
import "ace-builds/src-noconflict/theme-github";
import { useTestGenStore } from "./model/useTestGenStore";

export type TestGenProps = {
  prompt: string;
  code: string;
  token: string;
};

export const TestGen: FC<TestGenProps> = ({ prompt, code, token }) => {
  const { testCode, loading, generate } = useTestGenStore();

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Button onClick={() => generate(prompt, code, token)} disabled={loading}>
        Сгенерировать тест
      </Button>
      {testCode && (
        <>
          <Typography>Unit-тест:</Typography>
          <AceEditor value={testCode} mode="tsx" theme="github" width="100%" height="180px" readOnly />
        </>
      )}
    </Paper>
  );
};
