import { api } from '@/utils/api/apiInstance';
import { UpdatePersonalInfoInput } from '@/schemas/profile/personalInformationSchema';

export const updatePersonalInfo = async (data: UpdatePersonalInfoInput) => {
  const response = await api.patch('/auth/update-personal-info', data);
  return response.data;
};
