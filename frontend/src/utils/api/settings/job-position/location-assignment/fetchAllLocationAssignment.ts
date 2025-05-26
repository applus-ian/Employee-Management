import { api } from '@/utils/api/apiInstance';
import { locationAssignmentArraySchema } from '@/schemas/settings/job-position/location-assignment/locationAssignment';

export const fetchLocationAssignments = async () => {
  const response = await api.get('/location-assignments/list');
  return locationAssignmentArraySchema.parse(response.data);
};
