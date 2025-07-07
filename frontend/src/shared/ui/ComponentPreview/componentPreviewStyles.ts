import type { Theme } from '@mui/material';

export const componentPreviewRootSx = (theme: Theme) => ({
  bgcolor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginTop: theme.spacing(3),
  boxShadow: theme.shadows[1],
});
