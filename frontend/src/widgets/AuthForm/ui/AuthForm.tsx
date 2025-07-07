import type { FC } from 'react';
import { Box } from '@mui/material';
import { UserLogin } from '@features/Login';
import { UserRegister } from '@features/Register';

export type AuthFormProps = {
  mode: 'login' | 'register';
};

export const AuthForm: FC<AuthFormProps> = ({ mode }) => (
  <Box>
    {mode === 'login' ? <UserLogin /> : <UserRegister />}
  </Box>
);
