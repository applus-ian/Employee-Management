'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useCreateTeamAssign } from '@/hooks/settings/job-position/team-assign/use-create-team-assign';

// Zod Schema
const teamAssignSchema = z.object({
  name: z.string().min(1, 'Team name is required'),
});

// Infer the form type
type TeamAssignInput = z.infer<typeof teamAssignSchema>;

interface NewTeamAssignFormProps {
  onCancel: () => void;
  onSave: (data: TeamAssignInput) => void;
}

export default function NewTeamAssignForm({ onCancel, onSave }: NewTeamAssignFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamAssignInput>({
    resolver: zodResolver(teamAssignSchema),
  });

  const { mutate: createTeamAssign, isPending, isError, error } = useCreateTeamAssign();

  const onSubmit = (data: TeamAssignInput) => {
    createTeamAssign(data, {
      onSuccess: () => {
        onSave(data);
        reset();
        onCancel();
      },
      onError: (error: { message: string }) => {
        console.error('Error creating team assignment:', error.message);
      },
    });
  };

  return (
    <DialogContent className="w-full lg:!max-w-[35rem] h-fit flex flex-col bg-white">
      <DialogHeader>
        <DialogTitle>Create New Team Assignment</DialogTitle>
      </DialogHeader>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid">
            <div className="flex flex-col p-5">
              <div>
                <Label>
                  <h3 className="text-black font-base">Team Name</h3>
                </Label>
              </div>
              <div>
                <Input id="name" {...register('name')} placeholder="Enter team name..." className="mt-2" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
            </div>

            {isError && (
              <div className="text-red-600">
                <p>Error creating Team Assignment: {error?.message}</p>
              </div>
            )}

            <div className=" px-5 pt-5 flex justify-center gap-x-6">
              <Button type="submit" className="bg-[#EE7A2A] text-white w-[10rem]" disabled={isPending}>
                {isPending ? 'Creating...' : 'Create'}
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
