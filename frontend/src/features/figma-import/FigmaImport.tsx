import { Button, Paper, TextField } from "@mui/material";
import React, { type FC } from "react";
import { useFigmaImportStore } from "./model/useFigmaImportStore";

export type FigmaImportProps = {
  token: string;
  onImport: (code: string) => void;
};

export const FigmaImport: FC<FigmaImportProps> = ({ token, onImport }) => {
  const {
    fileId, nodeId, loading,
    setFileId, setNodeId, importFromFigma
  } = useFigmaImportStore();

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <TextField
        label="Figma File ID"
        value={fileId}
        onChange={(e) => setFileId(e.target.value)}
        sx={{ mr: 2 }}
      />
      <TextField
        label="Node ID"
        value={nodeId}
        onChange={(e) => setNodeId(e.target.value)}
        sx={{ mr: 2 }}
      />
      <Button
        variant="outlined"
        onClick={() => importFromFigma(token, onImport)}
        disabled={loading}
      >
        Импортировать
      </Button>
    </Paper>
  );
};
