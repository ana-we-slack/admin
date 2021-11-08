import { useAxios } from '../context/useAxios';

const login = (email, password) => {
  return useAxios.post(`/auth/login`, {
    email,
    password,
  });
};

const forgetPassword = (email) => {
  return useAxios.post(`/auth/forget-password`, { email });
};

const authApi = {
  login,
  forgetPassword,
};

export default authApi;
