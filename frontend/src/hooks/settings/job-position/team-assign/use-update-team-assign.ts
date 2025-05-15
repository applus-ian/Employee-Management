import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTeamAssign } from '@/utils/api/settings/job-position/team-assign/updateTeamAssign';

export const useUpdateTeamAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTeamAssign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-assigns'] });
    },
  });
};
