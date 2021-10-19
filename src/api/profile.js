import axios from '../axios';

const myProfile = () => {
  return axios.get(`/profile`);
};

const updateProfile = (body) => {
  return axios.patch(`/profile`, { body });
};

const updateProfilePassword = (password, oldPassword) => {
  return axios.patch(`/profile/password`, {
    password,
    old_password: oldPassword,
  });
};

const uploadProfileAvatar = (avatar) => {
  return axios.patch(`/profile/avatar`, { avatar });
};

const profileApi = {
  uploadProfileAvatar,
  updateProfilePassword,
  myProfile,
  updateProfile,
};

export default profileApi;
