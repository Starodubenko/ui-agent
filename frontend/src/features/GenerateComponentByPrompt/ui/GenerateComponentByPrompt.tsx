import { Box, TextField, useTheme, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Button } from '@shared/ui/Button';
import { CodeBlock } from '@shared/ui/CodeBlock';
import { useGenerateComponentByPrompt } from '../model/useGenerateComponentByPrompt';
import { errorSx, formRootSx, resultSx } from './generateComponentByPromptStyles';

export const GenerateComponentByPrompt = () => {
  const [title, setTitle] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [extra, setExtra] = useState('');
  const [prompt, setPrompt] = useState('');

  const { generate, result, loading, error } = useGenerateComponentByPrompt();
  const theme = useTheme();

  const handleGenerate = () => {
    generate({
      title,
      technologies,
      styles,
      extra,
      meta: prompt,
    });
  };

  return (
    <Grid container spacing={3} sx={{ height: '100%' }}>
      {/* Form (Left side) */}
      <Grid item xs={12} md={6}>
        <Box sx={formRootSx(theme)}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Technologies (comma separated)"
            fullWidth
            value={technologies.join(', ')}
            onChange={e =>
              setTechnologies(e.target.value.split(',').map(s => s.trim()).filter(Boolean))
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Styles (comma separated)"
            fullWidth
            value={styles.join(', ')}
            onChange={e =>
              setStyles(e.target.value.split(',').map(s => s.trim()).filter(Boolean))
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Extra details"
            fullWidth
            multiline
            minRows={2}
            value={extra}
            onChange={e => setExtra(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Raw Prompt"
            multiline
            rows={4}
            fullWidth
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Опиши желаемый компонент..."
          />
          <Button
            onClick={handleGenerate}
            loading={loading}
            fullWidth
            disabled={!title.trim()}
            sx={{ mt: 2 }}
          >
            Сгенерировать
          </Button>
          {error && (
            <Box sx={errorSx(theme)} mt={2}>
              {error}
            </Box>
          )}
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box sx={resultSx(theme)} height="100%">
          {result ? (
            <>
              <Typography variant="h6" gutterBottom>
                Сгенерированный компонент
              </Typography>
              <CodeBlock code={result.response.code} language="tsx" />
            </>
          ) : (
            <Typography color="text.secondary">
              Код появится здесь после генерации
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
