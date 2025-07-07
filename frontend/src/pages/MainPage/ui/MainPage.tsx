import type { FC } from 'react';
import { Box, Typography } from '@mui/material';

export const MainPage: FC = () => (
  <Box p={4}>
    <Typography variant="h4">Добро пожаловать!</Typography>
    <Typography>Это главная страница после авторизации.</Typography>
  </Box>
);
