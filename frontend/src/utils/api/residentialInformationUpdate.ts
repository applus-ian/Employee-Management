import { api } from '@/utils/api/apiInstance';
import { UpdateResidentialInfoInput } from '@/schemas/residentialInformationSchema';

export const updateResidentialInfo = async (data: UpdateResidentialInfoInput) => {
  const response = await api.patch('/auth/update-residential-info', data);
  return response.data;
};
