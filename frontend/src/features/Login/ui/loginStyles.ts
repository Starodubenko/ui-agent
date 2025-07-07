import type { Theme } from '@mui/material';

export const loginFormSx = (theme: Theme) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
});

export const loginFieldSx = (theme: Theme) => ({
  bgcolor: theme.palette.background.input,
  borderRadius: theme.shape.borderRadius,
});

export const loginErrorSx = (theme: Theme) => ({
  color: theme.palette.error.main,
  marginBottom: theme.spacing(1),
});
