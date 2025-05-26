'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogClose } from '@/components/ui/dialog';
import { DepartmentAssign, EditDepartmentAssignInput, editDepartmentAssignSchema } from '@/schemas';
import { useDepartmentAssign } from '@/hooks/settings/job-position/department-assign/use-fetch-department-assigns';
import toast from 'react-hot-toast';

interface EditDepartmentAssignFormProps {
  department_assign: DepartmentAssign;
  onCancel: () => void;
  onSave: (updatedDepartmentAssign: EditDepartmentAssignInput) => Promise<void> | void;
}

export function EditDepartmentAssignForm({ department_assign, onCancel, onSave }: EditDepartmentAssignFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditDepartmentAssignInput>({
    resolver: zodResolver(editDepartmentAssignSchema),
    defaultValues: {
      id: department_assign.id,
      name: department_assign.name,
      parent_department_id: department_assign.parent_department?.id,
    },
  });

  const { data: departments = [], isLoading: deptLoading } = useDepartmentAssign();

  const onSubmit = async (data: EditDepartmentAssignInput) => {
    await onSave({
      ...department_assign,
      name: data.name,
      parent_department_id: data.parent_department_id,
    });
    toast.success('Department Assignment Updated Successfully!');
    reset(data);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="name">Department Assign Name</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="parent_department_id">Parent Department</Label>
        <select
          id="parent_department_id"
          className="mt-2 w-full rounded-md border px-2 py-1 text-sm"
          {...register('parent_department_id')}
          disabled={deptLoading}
        >
          <option value="">Select Parent Department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        {errors.parent_department_id && <p className="text-sm text-red-500">{errors.parent_department_id.message}</p>}
      </div>

      <div className="flex justify-end gap-x-4 pt-2">
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" className="bg-[#EE7A2A] text-white" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
