import axios from 'axios';
import { createContext, useContext } from 'react';
import { useAuth } from '../context/useAuth';

const AxiosContext = createContext();
export function ProvideAxios({ children }) {
  const authAxios = useProvideAxios();
  return (
    <AxiosContext.Provider value={authAxios}>{children}</AxiosContext.Provider>
  );
}

export const useAxios = () => {
  return useContext(AxiosContext);
};

export function useProvideAxios() {
  const { authState } = useAuth();

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  authAxios.interceptors.response.use(
    (config) => {
      config.headers.Authorization = `Bearer ${authState.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  authAxios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      const code = error && error.response ? error.response.status : 0;
      if (code === 401 || code === 403) {
        console.log('error code', code);
      }
      return Promise.reject(error);
    }
  );

  return authAxios;
}
