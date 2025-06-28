#!/bin/bash

set -e

# Создаём директории
mkdir -p src/entities/test-gen/model

# Zustand store
cat <<EOF > src/entities/test-gen/model/useTestGenStore.ts
import { create } from "zustand";

interface TestGenState {
  testCode: string;
  loading: boolean;
  setTestCode: (code: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useTestGenStore = create<TestGenState>((set) => ({
  testCode: "",
  loading: false,
  setTestCode: (testCode) => set({ testCode }),
  setLoading: (loading) => set({ loading }),
}));
EOF

# Компонент с zustand
cat <<EOF > src/entities/test-gen/TestGen.tsx
import React, { type FC } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { generateTest } from "../api/api";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-github";
import { useTestGenStore } from "./model/useTestGenStore";

export type TestGenProps = {
  prompt: string;
  code: string;
  token: string;
};

export const TestGen: FC<TestGenProps> = ({ prompt, code, token }) => {
  const { testCode, setTestCode, loading, setLoading } = useTestGenStore();

  const handleGenTest = async () => {
    setLoading(true);
    try {
      const test = await generateTest(prompt, code, token);
      setTestCode(test);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Button onClick={handleGenTest} disabled={loading}>Сгенерировать тест</Button>
      {testCode && (
        <>
          <Typography>Unit-тест:</Typography>
          <AceEditor value={testCode} mode="tsx" theme="github" width="100%" height="180px" readOnly />
        </>
      )}
    </Paper>
  );
};
EOF

# Barrel export
echo "export * from './TestGen';" > src/entities/test-gen/index.ts

echo "✅ TestGen с zustand-store готов!"
