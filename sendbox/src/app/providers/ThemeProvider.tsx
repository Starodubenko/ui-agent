import type { FC, PropsWithChildren } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@app/theme';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);
