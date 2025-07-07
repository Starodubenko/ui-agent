import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2d5cff',
      contrastText: '#fff',
    },
    secondary: {
      main: '#21b6a8',
    },
    background: {
      default: '#f5f7fa',
      paper: '#fff',
      input: '#f1f3f7',
    },
    text: {
      primary: '#22223b',
      secondary: '#7b7d99',
    },
    error: {
      main: '#f44336',
    },
    success: {
      main: '#3dd598',
    },
    warning: {
      main: '#ffb547',
    },
    info: {
      main: '#2d9cdb',
    },
    divider: '#e0e3ea',
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 4,
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: { fontWeight: 700, fontSize: 38 },
    h2: { fontWeight: 700, fontSize: 32 },
    h3: { fontWeight: 600, fontSize: 26 },
    h4: { fontWeight: 600, fontSize: 22 },
    h5: { fontWeight: 600, fontSize: 18 },
    h6: { fontWeight: 500, fontSize: 16 },
    body1: { fontWeight: 400, fontSize: 16 },
    body2: { fontWeight: 400, fontSize: 14 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px 0 #22313f1a',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          minHeight: 44,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: '#f1f3f7',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        indicator: {
          height: 3,
          borderRadius: 3,
          background: '#2d5cff',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});
