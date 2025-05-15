import { api } from '@/utils/api/apiInstance';
import { employmentTypeArraySchema } from '@/schemas/settings/employee/employment-type/employmentType';

export const fetchEmploymentTypes = async () => {
  const response = await api.get('/employment-types/list');
  return employmentTypeArraySchema.parse(response.data);
};
