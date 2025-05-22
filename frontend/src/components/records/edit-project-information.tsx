import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUpdateRecord } from '@/hooks/records/use-update-record';
import { useState } from 'react';
import { z } from 'zod';

const projectEditSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().optional(),
});

type ProjectEditInput = z.infer<typeof projectEditSchema>;

interface EditProjectInformationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any;
  onClose?: () => void;
}

export function EditProjectInformation({ project, onClose }: EditProjectInformationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectEditInput>({
    resolver: zodResolver(projectEditSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      start_date: project.start_date,
      end_date: project.end_date,
    },
  });
  const { mutate, isPending } = useUpdateRecord();
  const [success, setSuccess] = useState(false);

  const onSubmit = (data: ProjectEditInput) => {
    mutate(
      { id: project.id, ...data },
      {
        onSuccess: () => {
          setSuccess(true);
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          onClose && onClose();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
        <Input {...register('name')} />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <Input {...register('description')} />
        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
        <Input type="date" {...register('start_date')} />
        {errors.start_date && <span className="text-red-500 text-sm">{errors.start_date.message}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
        <Input type="date" {...register('end_date')} />
        {errors.end_date && <span className="text-red-500 text-sm">{errors.end_date.message}</span>}
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-[#EE7A2A] text-white" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      {success && <div className="text-green-600">Project updated!</div>}
    </form>
  );
}
