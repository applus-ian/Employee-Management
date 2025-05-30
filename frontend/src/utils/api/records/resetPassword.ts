import api from '../apiInstance';

export const resetPassword = async (data: {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}) => {
  const response = await api.patch('/employees/change-password', data);
  return response.data;
};
