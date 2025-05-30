import { apiFile } from '@/utils/api/apiInstance';
import { UpdatePersonalPhotoInput } from '@/schemas/profile/personalPhotoSchema';

export const updatePersonalPhoto = async (data: UpdatePersonalPhotoInput) => {
  const formData = new FormData();
  // Accept only File for profile_pic_url
  if (
    data.profile_pic_url &&
    typeof window !== 'undefined' &&
    typeof File !== 'undefined' &&
    data.profile_pic_url instanceof File
  ) {
    formData.append('profile_pic_url', data.profile_pic_url, data.profile_pic_url.name);
  } else {
    throw new Error('profile_pic_url must be a File');
  }
  // Remove Content-Type header for this request (let browser/axios set it)
  const response = await apiFile.post('/auth/update-profile-photo', formData);
  return response.data;
};
