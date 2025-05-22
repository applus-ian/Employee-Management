import api from '@/utils/api/apiInstance';
import { UpdateLocationAssignment } from '@/schemas/settings/job-position/location-assignment/locationAssignment';

export const updateLocationAssignment = async (data: UpdateLocationAssignment) => {
  const response = await api.put(`/location-assignments/update/${data.id}`, data);
  return response.data;
};
