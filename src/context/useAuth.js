import { useContext, createContext, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

export function useProvideAuth() {
  const history = useHistory();
  const token = localStorage.getItem('Token');
  const user = localStorage.getItem('User');

  const [authState, setAuthState] = useState({
    token,
    user,
  });

  const setAuthInfo = useCallback(({ token, user }) => {
    localStorage.setItem('Token', token);
    localStorage.setItem('User', JSON.stringify(user));
    setAuthState({
      token,
      user,
    });
  }, []);

  const logout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('User');
    setAuthState({
      token: null,
      user: null,
    });
    history?.push('/');
  };

  return {
    authState,
    setAuthState: setAuthInfo,
    logout,
  };
}
