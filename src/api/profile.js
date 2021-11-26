import axios from './axios';

const myProfile = () => {
  return axios.get(`/profile`);
};

const updateProfile = (body) => {
  return axios.patch(`/profile`, body);
};

const updateProfilePassword = (old_password, password) => {
  return axios.patch(`/profile/password`, {
    old_password,
    password,
  });
};

const uploadProfileAvatar = (avatar) => {
  return axios.patch(`/profile/avatar`, avatar);
};

const profileApi = {
  uploadProfileAvatar,
  updateProfilePassword,
  myProfile,
  updateProfile,
};

export default profileApi;
