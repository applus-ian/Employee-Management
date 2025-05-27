import api from '@/utils/api/apiInstance';
import { CreateLocationAssignment } from '@/types/settings/job-position/location-assignment/locationAssignment';

export const createLocationAssignment = async (data: CreateLocationAssignment) => {
  const response = await api.post('/location-assignments/new', data);
  return response.data;
};
