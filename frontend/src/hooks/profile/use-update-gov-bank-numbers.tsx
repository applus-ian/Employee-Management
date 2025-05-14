import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateGovBankNumbers } from '@/utils/api/profile/govBankNumbersUpdate';
import { UpdateGovBankNumberInput } from '@/schemas/profile/govBankNumberSchema';

export const useUpdateGovBankNumbers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateGovBankNumberInput) => updateGovBankNumbers(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'], exact: true });
      alert('Government and Bank Numbers updated successfully!'); // Success notification
    },

    onError: (error) => {
      console.error('Error updating government and bank numbers:', error);
      alert('An error occurred while updating your information.'); // Error notification
    },
  });
};
