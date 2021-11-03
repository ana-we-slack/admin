import { useContext, createContext, useEffect } from 'react';
import profileApi from '../api/profile';
import { useAsync } from '../utils/useAsync';
import Spinner from '../components/spinner';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

export function useProvideAuth() {
  const { data, error, status, run } = useAsync();

  useEffect(() => {
    run(profileApi.myProfile());
  }, [run]);

  if (status === 'pending') {
    return <Spinner />;
  } else if (status === 'error') {
    throw error;
  }

  return {
    user: data,
  };
}
