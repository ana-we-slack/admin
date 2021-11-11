import axios from './axios';

const login = (email, password) => {
  return axios.post(`/auth/login`, {
    email,
    password,
  });
};

const forgetPassword = (email) => {
  return axios.post(`/auth/forget-password`, { email });
};

const authApi = {
  login,
  forgetPassword,
};

export default authApi;
