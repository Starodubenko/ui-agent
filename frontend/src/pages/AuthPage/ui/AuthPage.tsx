import type { FC } from 'react';
import { useState } from 'react';
import { Box, Paper, Tabs, Tab, Typography, useTheme } from '@mui/material';
import { AuthForm } from '@widgets/AuthForm';
import {
  authPageRootSx,
  authPagePaperSx,
  authTabsSx,
  authTitleMb,
} from './authPageStyles';

export const AuthPage: FC = () => {
  const [tab, setTab] = useState(0);
  const theme = useTheme();

  return (
    <Box sx={authPageRootSx(theme)}>
      <Paper elevation={3} sx={authPagePaperSx(theme)}>
        <Typography variant="h5" align="center" mb={authTitleMb}>
          Авторизация
        </Typography>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="fullWidth"
          sx={authTabsSx(theme)}
        >
          <Tab label="Войти" />
          <Tab label="Зарегистрироваться" />
        </Tabs>
        <AuthForm mode={tab === 0 ? 'login' : 'register'} />
      </Paper>
    </Box>
  );
};
