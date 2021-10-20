import axios from '../axios';

const createAdmin = (body) => {
  return axios.post(`/admin`, body);
};

const searchAdmin = (searchTerm, options) => {
  return axios.get(`/admin`, { params: { searchTerm, options } });
};
const getAdmins = () => {
  return axios.get(`/admin`);
};
const getAdminById = (id) => {
  return axios.get(`/admin/${id}`);
};

const updateAdmin = (id, body) => {
  return axios.patch(`/admin/${id}`, body);
};

const resetAdminPassword = (password, resetPasswordToken) => {
  return axios.patch(`/admin/password`, {
    reset_password_token: resetPasswordToken,
    password,
  });
};

const deleteAdmin = (id) => {
  return axios.delete(`/admin/${id}`);
};

const adminApi = {
  getAdminById,
  deleteAdmin,
  createAdmin,
  updateAdmin,
  getAdmins,
  searchAdmin,
  resetAdminPassword,
};

export default adminApi;
