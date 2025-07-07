import type { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserStore } from '@entities/User/model/user.store';

export const PrivateRoute: FC = () => {
  const user = useUserStore((s) => s.user);
  const rehydrated = useUserStore((s) => s.rehydrated);

  if (!rehydrated) return null;
  return user ? <Outlet /> : <Navigate to="/auth" replace />;
};


export const PublicRoute: FC = () => {
  const user = useUserStore((s) => s.user);
  return !user ? <Outlet /> : <Navigate to="/" replace />;
};
