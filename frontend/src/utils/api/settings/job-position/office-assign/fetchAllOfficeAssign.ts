import { api } from '@/utils/api/apiInstance';
import { officeAssignArraySchema } from '@/schemas/settings/job-position/office-assign/officeAssign';

export const fetchOfficeAssigns = async () => {
  const response = await api.get('/office-assigns/list');
  return officeAssignArraySchema.parse(response.data);
};
