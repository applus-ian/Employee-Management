import { useMutation, useQueryClient } from '@tanstack/react-query';
import { activateAccount, type ActivateAccountData } from '@/utils/api/records/createRecord';

export const useActivateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ActivateAccountData) => activateAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
  });
};
