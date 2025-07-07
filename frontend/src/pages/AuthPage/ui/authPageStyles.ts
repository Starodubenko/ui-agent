import type { Theme } from '@mui/material';

export const authPageRootSx = (theme: Theme) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: theme.palette.background.default,
});

export const authPagePaperSx = (theme: Theme) => ({
  padding: theme.spacing(4),
  width: 380,
  borderRadius: +theme.shape.borderRadius * 1.33,
  boxShadow: theme.shadows[3],
});

export const authTabsSx = (theme: Theme) => ({
  marginBottom: theme.spacing(2),
});

export const authTitleMb = 2;
