import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/ui/pages/Auth/context/AuthProvider';

export const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
