import type { FC } from 'react';
import { Box, useTheme } from '@mui/material';
import { PromptForm } from '@widgets/PromptForm';
import { promptPageRootSx } from './promptPageStyles';

export const PromptPage: FC = () => {
  const theme = useTheme();
  return (
    <Box sx={promptPageRootSx(theme)}>
      <PromptForm />
    </Box>
  );
};
