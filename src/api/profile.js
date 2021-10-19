import axios from '../axios';

const myProfile = () => {
  return axios.get(`/profile`);
};

const updateProfile = (...body) => {
  return axios.patch(`/profile`, { ...body });
};

const updateProfilePassword = (password, oldPassword, ...body) => {
  return axios.patch(`/profile/password`, {
    password,
    old_password: oldPassword,
    ...body,
  });
};

const uploadProfileAvatar = (avatar, ...body) => {
  return axios.patch(`/profile/avatar`, { avatar, ...body });
};

const profileApi = {
  uploadProfileAvatar,
  updateProfilePassword,
  myProfile,
  updateProfile,
};

export default profileApi;
