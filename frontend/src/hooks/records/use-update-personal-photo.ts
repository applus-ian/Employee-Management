import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePersonalPhoto } from '@/utils/api/profile/personalPhotoUpdate';

export const useUploadProfilePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ profile_pic_url }: { profile_pic_url?: File }) => updatePersonalPhoto({ profile_pic_url }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'], exact: true });
    },
  });
};
