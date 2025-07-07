import type { FC } from 'react';
import { Paper, Typography, useTheme } from '@mui/material';
import { GenerateComponentByPrompt } from '@features/GenerateComponentByPrompt';
import { promptFormPaperSx, promptFormTitleSx } from './promptFormStyles';

export const PromptForm: FC = () => {
  const theme = useTheme();
  return (
    <Paper elevation={3} sx={promptFormPaperSx(theme)}>
      <Typography variant="h5" sx={promptFormTitleSx(theme)}>
        Генерация компонента по Prompt
      </Typography>
      <GenerateComponentByPrompt />
    </Paper>
  );
};
