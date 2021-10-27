import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` },
});

instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    console.log(error.toJSON());
  }
);
export default instance;
