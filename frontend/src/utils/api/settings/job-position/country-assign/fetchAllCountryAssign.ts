import { api } from '@/utils/api/apiInstance';
import { countryAssignArraySchema } from '@/schemas/settings/job-position/country-assign/countryAssign';

export const fetchCountryAssigns = async () => {
  const response = await api.get('/country-assigns/list');
  return countryAssignArraySchema.parse(response.data);
};
