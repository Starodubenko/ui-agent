import {
  ContentCopy as ContentCopyIcon,
  Replay as ReplayIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import 'ace-builds';
import "ace-builds/src-noconflict/mode-tsx";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-github";
import React, { useEffect } from "react";
import AceEditor from "react-ace";
import { TestGen } from "../../../entities/test-gen";
import { PreviewFrame } from "../../../widgets/PreviewFrame";
import { Auth } from "../../auth";
import { FigmaImport } from "../../figma-import";
import { useAiCommunicationStore } from "../model/useAiCommunicationStore";

export const AICommunication: React.FC = () => {
  const {
    token,
    setToken,
    tab,
    setTab,
    input,
    setInput,
    code,
    setCode,
    loading,
    history,
    showSuccess,
    setShowSuccess,
    refactored,
    handleGenerate,
    handleRefactor,
    fetchHistory,
  } = useAiCommunicationStore();

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line
  }, [token, code]);

  if (!token)
    return (
      <Auth
        onAuth={(t) => {
          setToken(t);
          localStorage.setItem("token", t);
        }}
      />
    );

  return (
    <Box sx={{ bgcolor: "#f5f5f7", minHeight: "100vh", py: 5 }}>
      <Paper
        sx={{ maxWidth: 900, mx: "auto", p: 4, borderRadius: 4, boxShadow: 4 }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom>
          UI Agent (Material UI v7 + NestJS + Mongo + Auth + Figma + Тесты)
        </Typography>
        <Tabs value={tab} onChange={(_, t) => setTab(t)} sx={{ mb: 2 }}>
          <Tab label="Генерация" />
          <Tab label="История" />
          <Tab label="Figma" />
          <Tab label="Рефакторинг" />
        </Tabs>
        {tab === 0 && (
          <>
            <TextField
              label="Опиши интерфейс или компонент (на русском/англ.)"
              multiline
              fullWidth
              minRows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleGenerate}
              disabled={!input || loading}
            >
              {loading ? <CircularProgress size={28} /> : "Сгенерировать"}
            </Button>
            {code && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Сгенерированный код:
                  <IconButton
                    size="small"
                    onClick={() => {
                      navigator.clipboard.writeText(code);
                      setShowSuccess(true);
                    }}
                    sx={{ ml: 1 }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={handleRefactor}
                    sx={{ ml: 1 }}
                  >
                    <ReplayIcon fontSize="small" />
                  </IconButton>
                </Typography>
                <AceEditor
                  mode="tsx"
                  theme="github"
                  name="generated-code"
                  value={refactored || code}
                  fontSize={16}
                  width="100%"
                  height="340px"
                  readOnly
                  setOptions={{ useWorker: false }}
                />
                <TestGen
                  prompt={input}
                  code={refactored || code}
                  token={token}
                />
                <PreviewFrame code={refactored || code} />
              </Box>
            )}
          </>
        )}
        {tab === 1 && (
          <Paper sx={{ my: 2, p: 2, bgcolor: "#fcfcfc" }}>
            <Typography fontWeight={600}>История генераций:</Typography>
            <List dense>
              {history.map((item, idx) => (
                <ListItem
                  key={idx}
                  onClick={() => {
                    setCode(item.code);
                    setInput(item.prompt);
                    setTab(0);
                  }}
                >
                  <ListItemText
                    primary={item.prompt}
                    secondary={new Date(item.createdAt).toLocaleString()}
                  />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 1 }} />
          </Paper>
        )}
        {tab === 2 && (
          <FigmaImport
            token={token}
            onImport={(code) => {
              setCode(code);
              setTab(0);
            }}
          />
        )}
        {tab === 3 && (
          <>
            <Typography variant="h6" gutterBottom>
              Вставьте код для рефакторинга
            </Typography>
            <AceEditor
              mode="tsx"
              theme="github"
              name="refactor-code"
              value={code}
              fontSize={16}
              width="100%"
              height="240px"
              onChange={setCode}
              setOptions={{ useWorker: false }}
            />
            <Button
              variant="outlined"
              onClick={handleRefactor}
              sx={{ mt: 2 }}
              disabled={!code || loading}
            >
              Рефакторить
            </Button>
            {refactored && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1">Результат:</Typography>
                <AceEditor
                  mode="tsx"
                  theme="github"
                  name="refactored"
                  value={refactored}
                  fontSize={16}
                  width="100%"
                  height="240px"
                  readOnly
                  setOptions={{ useWorker: false }}
                />
                <PreviewFrame code={refactored} />
              </Box>
            )}
          </>
        )}
        <Snackbar
          open={showSuccess}
          autoHideDuration={1800}
          onClose={() => setShowSuccess(false)}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Готово!
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};
