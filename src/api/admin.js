import { useAxios } from '../context/useAxios';

const { authAxios } = useAxios();

const createAdmin = (body) => {
  return useAxios.post(`/admin`, body);
};

const searchAdmin = (searchTerm, options) => {
  return useAxios.get(`/admin`, { params: { searchTerm, options } });
};
const getAdmins = (params) => {
  return useAxios.get(`/admin`, { params });
};
const getAdminById = (id) => {
  return useAxios.get(`/admin/${id}`);
};

const updateAdmin = (id, body) => {
  return useAxios.patch(`/admin/${id}`, body);
};

const resetAdminPassword = (password, resetPasswordToken) => {
  return useAxios.patch(`/admin/password`, {
    reset_password_token: resetPasswordToken,
    password,
  });
};

const deleteAdmin = (id) => {
  return useAxios.delete(`/admin/${id}`);
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
