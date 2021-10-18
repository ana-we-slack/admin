import axios from '../axios';

// authorization
const getAdminById = (id) => {
  return axios.get(`/admin/${id}`).then((res) => res.data);
};

const adminApi = {
  getAdminById,
};

export default adminApi;
