import * as mui from "@mui/material";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { LiveError, LivePreview, LiveProvider } from "react-live";
import { useParams } from "react-router-dom";
import { useComponentStore } from "../store/component";

export const ComponentPreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // zustand: доступ к состоянию и методам компонента
  const {
    selected: component,
    loading,
    error,
    fetchComponentById,
    save,
  } = useComponentStore();

  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // Получаем компонент по id через zustand
  useEffect(() => {
    if (id) {
      fetchComponentById(id).then(() => {
        if (component) setName(component.name);
      });
    }
    // eslint-disable-next-line
  }, [id]);

  // Когда загрузился компонент — проставляем имя
  useEffect(() => {
    if (component) setName(component.name);
  }, [component]);

  const handleSave = async () => {
    if (!component) return;
    setSaving(true);
    await save(name, component.code);
    setSaving(false);
    setSaved(true);
  };

  if (loading || !component) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth={900} mx="auto" mt={5}>
      <Paper sx={{ p: 3, mb: 2 }}>
        <TextField
          label="Название компонента"
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="small"
          sx={{ mb: 2 }}
        />

        <Box display="flex" gap={4}>
          {/* Живой рендер компонента */}
          <LiveProvider code={component.code} scope={mui} noInline>
            <Box>
              <Box fontWeight="bold" mb={1}>
                Live Preview:
              </Box>
              <Paper
                sx={{ p: 2, minWidth: 340, minHeight: 120, bgcolor: "#fafafa" }}
              >
                <LivePreview />
                <LiveError style={{ color: "red" }} />
              </Paper>
            </Box>
          </LiveProvider>

          {/* Исходник */}
          <Box flex={1}>
            <Box fontWeight="bold" mb={1}>
              Исходный код:
            </Box>
            <pre
              style={{
                background: "#f7f7f7",
                padding: 16,
                borderRadius: 8,
                fontSize: 14,
                overflow: "auto",
                maxHeight: 340,
              }}
            >
              {component.code}
            </pre>
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          sx={{ mt: 2 }}
        >
          {saving ? "Сохраняем..." : "Сохранить"}
        </Button>
      </Paper>
      <Snackbar
        open={saved}
        autoHideDuration={2000}
        message="Сохранено!"
        onClose={() => setSaved(false)}
      />
      {error && (
        <Snackbar open={!!error} autoHideDuration={2500} message={error} />
      )}
    </Box>
  );
};
