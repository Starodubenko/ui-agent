import type { Theme } from '@mui/material';

export const promptPageRootSx = (theme: Theme) => ({
  minHeight: '100vh',
  bgcolor: theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
