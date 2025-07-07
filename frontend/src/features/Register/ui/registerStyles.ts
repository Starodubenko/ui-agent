import type { Theme } from '@mui/material';

export const registerFormSx = (theme: Theme) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
});

export const registerFieldSx = (theme: Theme) => ({
  bgcolor: theme.palette.background.input,
  borderRadius: theme.shape.borderRadius,
});

export const registerErrorSx = (theme: Theme) => ({
  color: theme.palette.error.main,
  marginBottom: theme.spacing(1),
});
