import { api } from '@/utils/api/apiInstance';
import { UpdatePersonalPhotoInput } from '@/schemas/profile/personalPhotoSchema';

export const updatePersonalPhoto = async (data: UpdatePersonalPhotoInput) => {
  const response = await api.patch('/auth/update-profile-photo', data);
  return response.data;
};
