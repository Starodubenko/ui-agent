import { useState } from 'react';
import { useRegisterMutation } from '../api/registerApi';
import { useUserStore } from '@entities/User/model/user.store';

export const useRegister = () => {
  const [registerMutation] = useRegisterMutation();
  const setAuth = useUserStore((s) => s.setAuth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await registerMutation({
        variables: { registerInput2: { email, password } },
      });
      if (data?.register?.user && data?.register?.accessToken) {
        setAuth(data.register.user, data.register.accessToken);
      } else {
        setError('Неверный ответ сервера');
      }
    } catch (e: any) {
      setError(e.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, register };
};
