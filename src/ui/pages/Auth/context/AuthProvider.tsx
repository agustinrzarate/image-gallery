import { createContext, useContext, useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { User } from '@/modules/Auth/domain/User';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { KeysLocalStorage } from '@/app/localStorage/keys';
import { clearLocalStorage } from '@/app/localStorage/setItem';

const AuthContext = createContext({});

export const AuthProvider = () => {
  const [user, setUser] = useLocalStorage(KeysLocalStorage.user, null);

  const navigate = useNavigate();

  const value = useMemo(() => {
    const login = async (data: User) => {
      setUser(data);
      navigate('/gallery');
    };

    const logout = () => {
      setUser(null);
      clearLocalStorage();
      navigate('/', { replace: true });
    };

    return {
      user,
      login,
      logout,
    };
  }, [user, setUser, navigate]);
  return (
    <AuthContext.Provider value={value}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext) as { user: User; login: (data: User) => void; logout: () => void };
};
