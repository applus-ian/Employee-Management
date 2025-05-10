import { api } from './apiInstance';
import Cookies from 'js-cookie';
import { handleApiError } from './handleApiError';
import { LoginCredentials } from '@/types/auth';

export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Login failed, please try again.');
    throw error;
  }
};

export const logoutUser = async () => {
  const token = Cookies.get('token');
  if (token) {
    try {
      await api.post('/auth/logout');
      Cookies.remove('token');
    } catch (error) {
      handleApiError(error, 'Logout failed, please try again.');
      throw error;
    }
  }
};

export const fetchUser = async () => {
  try {
    const response = await api.get('/auth/fetch-user');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Fetching user failed.');
    throw error;
  }
};
