import type { Theme } from '@mui/material';

export const formRootSx = (theme: Theme) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
});
export const errorSx = (theme: Theme) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(2),
});
export const resultSx = (theme: Theme) => ({
  marginTop: theme.spacing(3),
});
