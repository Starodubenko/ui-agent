import { useState } from 'react';
import { useLoginMutation } from '../api/loginApi';
import { useUserStore } from '@entities/User/model/user.store';

export const useLogin = () => {
  const [loginMutation] = useLoginMutation();
  const setAuth = useUserStore((s) => s.setAuth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await loginMutation({ variables: { input: { email, password } } });
      if (data?.login?.user && data?.login?.accessToken) {
        setAuth(data.login.user, data.login.accessToken);
      } else {
        setError('Неверный ответ сервера');
      }
    } catch (e: any) {
      setError(e.message || 'Ошибка авторизации');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login };
};
