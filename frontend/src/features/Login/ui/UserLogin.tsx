import type { FC } from 'react';
import { useState } from 'react';
import { Box, TextField, useTheme } from '@mui/material';
import { Button } from '@shared/ui/Button';
import { useLogin } from '../model/useLogin';
import {
  loginFormSx,
  loginFieldSx,
  loginErrorSx,
} from './loginStyles';

export const UserLogin: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, login } = useLogin();
  const theme = useTheme();

  return (
    <Box
      component="form"
      onSubmit={e => {
        e.preventDefault();
        login(email, password);
      }}
      sx={loginFormSx(theme)}
    >
      <TextField
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
        autoFocus
        sx={loginFieldSx(theme)}
      />
      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        sx={loginFieldSx(theme)}
      />
      {error && (
        <Box sx={loginErrorSx(theme)}>{error}</Box>
      )}
      <Button type="submit" fullWidth loading={loading}>
        Войти
      </Button>
    </Box>
  );
};
