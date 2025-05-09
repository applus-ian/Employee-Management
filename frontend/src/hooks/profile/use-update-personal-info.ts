import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePersonalInfo } from '@/utils/api/profile/personalInformationUpdate';
import { UpdatePersonalInfoInput } from '@/schemas/profile/personalInformationSchema';

export const useUpdatePersonalInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePersonalInfoInput) => updatePersonalInfo(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'], exact: true });
      alert('Personal information updated successfully!'); // Success notification
    },

    onError: (error) => {
      console.error('Error updating personal info:', error);
      alert('An error occurred while updating your information.'); // Error notification
    },
  });
};
