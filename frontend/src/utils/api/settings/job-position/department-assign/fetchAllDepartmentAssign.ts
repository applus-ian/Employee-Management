import { api } from '@/utils/api/apiInstance';
import { departmentAssignArraySchema } from '@/schemas/settings/job-position/department-assign/departmentAssign';

export const fetchDepartmentAssigns = async () => {
  const response = await api.get('/department-assigns/list');
  return departmentAssignArraySchema.parse(response.data);
};
