'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateRoleWithPermissions } from '@/hooks/settings/employee/role-and-permission/use-create-role-with-permissions';
import {
  createRoleWithPermissionsSchema,
  RoleWithPermissionsInput,
} from '@/schemas/settings/employee/role-and-permission/roleAndPermission';
import { usePermissions } from '@/hooks/settings/employee/role-and-permission/use-permissions';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface NewRoleFormProps {
  onCancel: () => void;
  onSave: (data: RoleWithPermissionsInput) => void;
}

export default function NewRoleForm({ onCancel, onSave }: NewRoleFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoleWithPermissionsInput>({
    resolver: zodResolver(createRoleWithPermissionsSchema),
  });

  const { mutate: createRoleWithPermissions, isPending, isError, error } = useCreateRoleWithPermissions();
  const { data: permissionList } = usePermissions();
  const [permissions, setPermissions] = useState<Record<number, boolean>>({});

  const handleToggle = (id: number) => {
    setPermissions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const onSubmit = (data: RoleWithPermissionsInput) => {
    const selectedPermissionIds = permissionList?.filter((perm) => permissions[perm.id]).map((perm) => perm.id) || [];

    const payload = {
      name: data.name,
      description: data.description,
      permission_ids: selectedPermissionIds, // now sending only integers
    };

    createRoleWithPermissions(payload, {
      onSuccess: () => {
        toast.success('Role created successfully!');
        console.log('Role created:', payload);
        onSave(payload);
        reset();
        onCancel();
      },
      onError: (error: { message: string }) => {
        toast.error(error.message || 'Error creating role');
        console.error('Error creating role:', error.message);
      },
    });
  };

  return (
    <DialogContent className="w-full lg:!max-w-[45rem] h-fit max-h-[35rem] flex flex-col bg-white overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Create New Role</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-5 py-3">
        <div>
          <Label htmlFor="name">
            <h3 className="text-black font-base">Role Name</h3>
          </Label>
          <Input id="name" {...register('name')} placeholder="Enter role name..." className="mt-2" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="description">
            <h3 className="text-black font-base">Description</h3>
          </Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Enter role description..."
            className="mt-2"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="p-5">
          <Label>
            <h3 className="text-black font-base">Permissions</h3>
          </Label>
          <div className="mt-2 px-4 py-2 pl-3 block w-full border rounded-xl bg-transparent border-gray-500 focus:border-indigo-500 sm:text-sm">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 py-4 p-3 max-h-50 overflow-y-auto gap-4">
              {permissionList?.map((perm) => (
                <div key={perm.id} className="flex flex-col py-2 p-3">
                  <h4 className="text-sm font-medium">{perm.name}</h4>
                  <Separator className="my-4 border border-[#BBD2EC] rounded-xl" />
                  <div className="flex justify-between h-5 space-x-4 text-sm">
                    <div className="text-gray-500">{perm.description}</div>
                    <Switch
                      id={perm.id.toString()}
                      checked={!!permissions[perm.id]}
                      onCheckedChange={() => handleToggle(perm.id)}
                      className="bg-gray-400 data-[state=checked]:bg-[#A7C513]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isError && (
          <div className="text-red-600">
            <p>Error creating role: {error?.message}</p>
          </div>
        )}

        <div className="flex justify-center gap-x-6 pt-3">
          <Button type="submit" className="bg-[#EE7A2A] text-white w-[10rem]" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create'}
          </Button>
          <Button
            type="button"
            className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
