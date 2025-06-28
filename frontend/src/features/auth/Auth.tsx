import { Alert, Button, Paper, Tab, Tabs, TextField } from "@mui/material";
import React, { type FC } from "react";
import { useAuthStore } from "./model/useAuthStore";

export type AuthProps = { onAuth: (token: string) => void };

export const Auth: FC<AuthProps> = ({ onAuth }) => {
  const {
    email, pass, error, tab,
    setEmail, setPass, setTab,
    handleLogin, handleRegister
  } = useAuthStore();

  return (
    <Paper sx={{ maxWidth: 360, mx: "auto", mt: 12, p: 3 }}>
      <Tabs value={tab} onChange={(_, t) => setTab(t)} sx={{ mb: 2 }}>
        <Tab label="Вход" />
        <Tab label="Регистрация" />
      </Tabs>
      <TextField
        label="Email"
        fullWidth
        sx={{ my: 1 }}
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Пароль"
        fullWidth
        sx={{ my: 1 }}
        type="password"
        value={pass}
        onChange={e => setPass(e.target.value)}
      />
      {tab === 0 ? (
        <Button
          variant="contained"
          fullWidth
          sx={{ my: 2 }}
          onClick={() => handleLogin(onAuth)}
        >
          Войти
        </Button>
      ) : (
        <Button
          variant="contained"
          fullWidth
          sx={{ my: 2 }}
          onClick={() => handleRegister(onAuth)}
        >
          Зарегистрироваться
        </Button>
      )}
      {error && <Alert severity="error">{error}</Alert>}
    </Paper>
  );
};
