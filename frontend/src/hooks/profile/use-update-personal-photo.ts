import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePersonalPhoto } from '@/utils/api/profile/personalPhotoUpdate';
import { UpdatePersonalPhotoInput } from '@/schemas/profile/personalPhotoSchema';

export const useUploadProfilePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePersonalPhotoInput) => updatePersonalPhoto(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'], exact: true });
      alert('Profile photo updated successfully!');
    },

    onError: (error) => {
      console.error('Error uploading profile photo:', error);
      alert('Failed to upload profile photo. Please try again.');
    },
  });
};
