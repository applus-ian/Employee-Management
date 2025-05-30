import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateResidentialInfo } from '@/utils/api/records/residentialInformationUpdate';
import { UpdateResidentialInfoInput } from '@/schemas/profile/residentialInformationSchema';

export const useUpdateResidentialInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateResidentialInfoInput) => updateResidentialInfo(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'], exact: true });
      alert('Residential information updated successfully!'); // Success notification
    },

    onError: (error) => {
      console.error('Error updating residential info:', error);
      alert('An error occurred while updating your information.'); // Error notification
    },
  });
};
