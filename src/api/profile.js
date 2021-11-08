import { useAxios } from '../context/useAxios';

const myProfile = () => {
  return useAxios.get(`/profile`);
};

const updateProfile = (body) => {
  return useAxios.patch(`/profile`, body);
};

const updateProfilePassword = (password, oldPassword) => {
  return useAxios.patch(`/profile/password`, {
    password,
    old_password: oldPassword,
  });
};

const uploadProfileAvatar = (avatar) => {
  return useAxios.patch(`/profile/avatar`, avatar);
};

const profileApi = {
  uploadProfileAvatar,
  updateProfilePassword,
  myProfile,
  updateProfile,
};

export default profileApi;
