import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTeamAssign } from '@/utils/api/settings/job-position/team-assign/createTeamAssign';

export const useCreateTeamAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTeamAssign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-assigns'] });
    },
  });
};
