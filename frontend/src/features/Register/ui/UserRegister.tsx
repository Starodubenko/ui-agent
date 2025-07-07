import type { FC } from 'react';
import { useState } from 'react';
import { Box, TextField, useTheme } from '@mui/material';
import { Button } from '@shared/ui/Button';
import { useRegister } from '../model/useRegister';
import {
  registerFormSx,
  registerFieldSx,
  registerErrorSx,
} from './registerStyles';

export const UserRegister: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, register } = useRegister();
  const theme = useTheme();

  return (
    <Box
      component="form"
      onSubmit={e => {
        e.preventDefault();
        register(email, password);
      }}
      sx={registerFormSx(theme)}
    >
      <TextField
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
        autoFocus
        sx={registerFieldSx(theme)}
      />
      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        sx={registerFieldSx(theme)}
      />
      {error && (
        <Box sx={registerErrorSx(theme)}>{error}</Box>
      )}
      <Button type="submit" fullWidth loading={loading}>
        Зарегистрироваться
      </Button>
    </Box>
  );
};
