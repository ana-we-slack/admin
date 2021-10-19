import axios from '../axios';

// authorization

const createAdmin = (first_name, last_name, email, password, username) => {
  const adminData = { first_name, last_name, email, password, username };
  return axios
    .post(`/admin`, adminData)
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error.toJSON());
    });
};

const searchAdmin = (search, filters, page_size) => {
  const searchAdminFilters = { search, filters, page_size };
  return axios
    .get(`/admin`, { params: { searchAdminFilters } })
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

const updateAdmin = (id, first_name, last_name, email, password, username) => {
  const updatedAdminData = { first_name, last_name, email, password, username };
  return axios
    .patch(`/admin/${id}`, updatedAdminData)
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
  searchAdmin,
};

export default adminApi;
