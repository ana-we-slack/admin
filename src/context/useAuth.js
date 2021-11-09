import { useContext, createContext, useState, useMemo } from 'react';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

export function useProvideAuth() {
  const token = localStorage.getItem('Token');
  const user = localStorage.getItem('User');

  const [authState, setAuthState] = useState({
    token,
    user,
  });

  const setAuthInfo = useMemo(
    () =>
      ({ token, user }) => {
        localStorage.setItem('Token', token);
        localStorage.setItem('User', JSON.stringify(user));
        setAuthState({
          token,
          user,
        });
      },
    []
  );

  return {
    authState,
    setAuthState: (authInfo) => setAuthInfo(authInfo),
  };
}
