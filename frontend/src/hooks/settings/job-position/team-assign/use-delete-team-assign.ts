import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTeamAssign } from '@/utils/api/settings/job-position/team-assign/deleteTeamAssign';

export const useDeleteTeamAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTeamAssign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-assigns'] });
    },
  });
};
