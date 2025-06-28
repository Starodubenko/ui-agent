import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useComponentStore } from "../store/component";

export const ComponentGallery: React.FC = () => {
  const { components, loading, error, fetchComponents } = useComponentStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchComponents();
    // eslint-disable-next-line
  }, []);

  if (loading)
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Box color="red" textAlign="center" mt={5}>
        {error}
      </Box>
    );

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(340px, 1fr))"
      gap={2}
      mt={4}
    >
      {components.map((comp) => (
        <Card key={comp.id} sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h6">
              {comp.name} <small>v{comp.version}</small>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(comp.updatedAt).toLocaleString()}
            </Typography>
            <pre
              style={{
                maxHeight: 120,
                overflow: "auto",
                fontSize: 13,
                background: "#eee",
                margin: "12px 0",
              }}
            >
              {comp.code.slice(0, 400)}
            </pre>
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate(`/preview/${comp.id}`)}
            >
              Предпросмотр
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
