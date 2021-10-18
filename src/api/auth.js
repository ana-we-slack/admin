import axios from '../axios';

const login = (email, password) => {
  return axios
    .post(`/auth/login`, {
      email,
      password,
    })
    .then((res) => res.data);
};

const authApi = {
  login,
};

export default authApi;
