import axios from '../axios';

// authorization

const createAdmin = () => {
  return axios
    .post(`/admin`)
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error.toJSON());
    });
};

const getAdmins = () => {
  return axios
    .get(`/admin`)
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error.toJSON());
    });
};
const getAdminById = (id) => {
  return axios
    .get(`/admin/${id}`)
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error.toJSON());
    });
};

const updateAdmin = (id) => {
  return axios
    .patch(`/admin/${id}`)
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error.toJSON());
    });
};

const deleteAdmin = (id) => {
  return axios.delete(`/admin/${id}`).catch(function (error) {
    console.log(error.toJSON());
  });
};

const adminApi = {
  getAdminById,
  deleteAdmin,
  createAdmin,
  updateAdmin,
  getAdmins,
};

export default adminApi;
