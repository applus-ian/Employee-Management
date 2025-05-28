'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useDepartmentAssign } from '@/hooks/settings/job-position/department-assign/use-fetch-department-assigns';
import { useCreateDepartmentAssign } from '@/hooks/settings/job-position/department-assign/use-create-department-assign';
import toast from 'react-hot-toast';

const departmentAssignSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
  parent_department_id: z.coerce.number().nullable(),
});

type DepartmentAssignInput = z.infer<typeof departmentAssignSchema>;

interface NewDepartmentAssignFormProps {
  onCancel: () => void;
  onSave: (data: DepartmentAssignInput) => void;
}

export default function NewDepartmentAssignForm({ onCancel, onSave }: NewDepartmentAssignFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentAssignInput>({
    resolver: zodResolver(departmentAssignSchema),
    defaultValues: {
      name: '',
      parent_department_id: undefined as unknown as number,
    },
  });

  const { data: departments = [], isLoading: deptLoading } = useDepartmentAssign();
  const { mutate: createDepartmentAssign, isPending, isError, error } = useCreateDepartmentAssign();

  const onSubmit = (data: DepartmentAssignInput) => {
    createDepartmentAssign(data, {
      onSuccess: () => {
        toast.success('Department Assignment Created!');
        onSave(data);
        reset();
        onCancel();
      },
      onError: () => {
        toast.error('Error on creating Department Assignment!');
      },
    });
  };

  return (
    <DialogContent className="flex h-fit w-full flex-col bg-white lg:!max-w-[45rem]">
      <DialogHeader>
        <DialogTitle>Create New Department Assign</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-5 py-3">
        <div>
          <Label htmlFor="name" className="text-black">
            Department Name
          </Label>
          <Input id="name" {...register('name')} placeholder="Enter department name..." className="mt-2" />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="parent_department_id" className="text-black">
            Parent Department
          </Label>
          <select
            id="parent_department_id"
            className="mt-2 w-full rounded-md border px-2 py-1 text-sm"
            {...register('parent_department_id')}
            disabled={deptLoading}
          >
            <option value="">Select Parent Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id.toString()}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.parent_department_id && <p className="text-sm text-red-500">{errors.parent_department_id.message}</p>}
        </div>

        {isError && (
          <div className="text-red-600">
            <p>Error creating department assign: {error?.message}</p>
          </div>
        )}

        {/* Actions ---------------------------------------------------------*/}
        <div className="flex justify-center gap-x-6 pt-3">
          <Button type="submit" className="w-[10rem] bg-[#EE7A2A] text-white" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create'}
          </Button>
          <Button
            type="button"
            className="w-[10rem] border-2 border-[#EE7A2A] bg-white text-[#EE7A2A]"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
