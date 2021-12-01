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

  const [authState, setAuthState] = useState({ token });

  const setAuthInfo = useCallback((token) => {
    localStorage.setItem('Token', token);
    setAuthState({
      token,
    });
  }, []);

  const logout = () => {
    localStorage.removeItem('Token');
    setAuthState({
      token: null,
    });
    history?.push('/');
  };

  return {
    authState,
    setAuthState: setAuthInfo,
    logout,
  };
}
