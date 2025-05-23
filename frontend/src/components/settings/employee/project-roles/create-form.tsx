'use client';

import { DialogClose, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCreateProjectRole } from '@/hooks/settings/employee/project-role/use-create-project-role';
import toast from 'react-hot-toast';
const projectRoleSchema = z.object({
  name: z.string().min(1, 'Project role name is required'),
});

type ProjectRoleInput = z.infer<typeof projectRoleSchema>;

interface NewProjectRoleFormProps {
  onCancel: () => void;
  onSave: (data: ProjectRoleInput) => void;
}

export default function NewProjectRoleForm({ onCancel, onSave }: NewProjectRoleFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectRoleInput>({
    resolver: zodResolver(projectRoleSchema),
  });

  const { mutate: createProjectRole, isPending, isError, error } = useCreateProjectRole();

  const onSubmit = (data: ProjectRoleInput) => {
    createProjectRole(data, {
      onSuccess: () => {
        toast.success(`Project role "${data.name}" created successfully!`);
        onSave(data);
        reset(); // Reset form
        onCancel(); // Close dialog
      },
      onError: (error: { message: string }) => {
        console.error('Error creating project role:', error.message);
      },
    });
  };

  return (
    <DialogContent className="w-full lg:!max-w-[45rem] h-fit flex flex-col bg-white">
      <DialogHeader>
        <DialogTitle>Create New Project Role</DialogTitle>
      </DialogHeader>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-5 py-3">
          <div className="grid">
            <div className="flex flex-col p-5">
              <div>
                <Label htmlFor="name">
                  <h3 className="text-black font-base">Project Role Name</h3>
                </Label>
              </div>
              <div>
                <Input id="name" {...register('name')} placeholder="Enter Project role name..." className="mt-2" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              {isError && (
                <div className="text-red-600">
                  <p>Error creating project role: {error?.message}</p>
                </div>
              )}
            </div>

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
