import axios from 'axios';
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    throw error;
  }
);

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('Token');
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default instance;
