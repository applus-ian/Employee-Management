'use client';

import { useEffect, useState } from 'react';
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@radix-ui/react-separator';
import { toast } from 'react-hot-toast';

import { useUpdateRole } from '@/hooks/settings/employee/role-and-permission/use-update-role-with-permissions';
import { usePermissions } from '@/hooks/settings/employee/role-and-permission/use-permissions';

interface EditRoleFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  role: any;
  onCancel: () => void; // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (updatedRole: any) => void;
}

export default function EditRoleForm({ role, onCancel, onSave }: EditRoleFormProps) {
  const { data: permissionList, isLoading: isPermLoading, isError } = usePermissions();
  const { mutateAsync: updateRole } = useUpdateRole();

  const [roleName, setRoleName] = useState(role.name);
  const [description, setDescription] = useState(role.description || '');
  const [permissions, setPermissions] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (permissionList && role) {
      const initialPermissions = permissionList.reduce(
        (acc, perm) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          acc[perm.id] = role.permissions.some((p: any) => p.id === perm.id);
          return acc;
        },
        {} as Record<number, boolean>,
      );
      setPermissions(initialPermissions);
      setRoleName(role.name);
      setDescription(role.description || '');
    }
  }, [role.id, permissionList]);

  const handleToggle = (id: number) => {
    setPermissions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const selectedPermissionIds =
        permissionList // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ?.filter((perm: any) => permissions[perm.id]) // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((perm: any) => perm.id) || [];

      const payload = {
        name: roleName.trim(),
        description: description.trim(),
        permission_ids: selectedPermissionIds,
      };

      await updateRole({ id: role.id, ...payload });

      toast.success('Role updated successfully!');
      onSave({
        ...role,
        ...payload, // eslint-disable-next-line @typescript-eslint/no-explicit-any
        permissions: permissionList?.filter((perm: any) => permissions[perm.id]),
      });
      onCancel();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || 'Error updating role');
    } finally {
      setIsLoading(false);
    }
  };

  if (isPermLoading) {
    return (
      <DialogContent className="w-full lg:!max-w-[45rem] h-fit bg-white">
        <div className="p-5">Loading permissions...</div>
      </DialogContent>
    );
  }

  if (isError) {
    return (
      <DialogContent className="w-full lg:!max-w-[45rem] h-fit bg-white">
        <div className="p-5 text-red-500">Failed to load permissions</div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="w-full lg:!max-w-[45rem] h-fit flex flex-col bg-white overflow-y-auto max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>Edit Role</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-5 px-5 py-3">
        <div className="flex flex-col">
          <Label htmlFor="roleName">
            <h3 className="text-black font-base">User Role</h3>
          </Label>
          <input
            id="roleName"
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="mt-2 px-4 py-2 pl-3 block w-full border rounded-xl bg-transparent border-gray-500 focus:border-indigo-500 sm:text-sm"
            required
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="description">
            <h3 className="text-black font-base">Description</h3>
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter role description..."
            className="mt-2"
            disabled={isLoading}
          />
        </div>

        <div>
          <Label>
            <h3 className="text-black font-base">Permissions</h3>
          </Label>
          <div className="mt-2 px-4 py-2 pl-3 block w-full border rounded-xl bg-transparent border-gray-500 focus:border-indigo-500 sm:text-sm max-h-[20rem] overflow-y-auto">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {permissionList?.map((perm: any) => (
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
                      disabled={isLoading}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-5 flex justify-center gap-x-6">
          <Button type="submit" className="bg-[#EE7A2A] text-white w-[10rem]" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>

          <DialogClose asChild>
            <Button
              type="button"
              className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  );
}
