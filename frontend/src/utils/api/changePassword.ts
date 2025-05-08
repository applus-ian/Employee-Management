import api from './apiInstance';

export const updatePassword = async (data: {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}) => {
  const response = await api.patch('/auth/change-password', data);
  return response.data;
};
