import { useState, useEffect } from 'react';
import { DialogClose, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RoleWithPermissions } from '@/types/settings/employee/roles-and-permission/roleAndPermission';
import { usePermissions } from '@/hooks/settings/employee/role-and-permission/usePermissions';

interface EditRoleFormProps {
  role: RoleWithPermissions;
  onCancel: () => void;
  onSave: (roleData: RoleWithPermissions) => void;
}

export default function EditRoleForm({ role, onCancel, onSave }: EditRoleFormProps) {
  const [roleName, setRoleName] = useState(role.name);
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});
  const { data: permissionList, isLoading, isError } = usePermissions();

  useEffect(() => {
    if (!permissionList) return;

    const permissionsMap = permissionList.reduce(
      (acc, perm) => {
        const hasPerm = role.permissions.some((p) => p.id === perm.id);
        acc[perm.id] = hasPerm;
        return acc;
      },
      {} as Record<string, boolean>,
    );

    setPermissions(permissionsMap);
    setRoleName(role.name);
  }, [role, permissionList]);

  const handleToggle = (id: string) => {
    setPermissions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    const updatedPermissions = permissionList?.filter((perm) => permissions[perm.id]) || [];

    onSave({
      ...role,
      name: roleName,
      permissions: updatedPermissions,
    });
    onCancel(); // Close form after saving
  };

  if (isLoading) {
    return (
      <DialogContent className="w-full lg:!max-w-[45rem] h-fit max-h-[35rem] flex flex-col bg-white overflow-y-auto">
        <div className="p-5">Loading permissions...</div>
      </DialogContent>
    );
  }

  if (isError) {
    return (
      <DialogContent className="w-full lg:!max-w-[45rem] h-fit max-h-[35rem] flex flex-col bg-white overflow-y-auto">
        <div className="p-5 text-red-500">Failed to load permissions</div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="w-full lg:!max-w-[45rem] h-fit max-h-[35rem] flex flex-col bg-white overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Update Employee Role</DialogTitle>
      </DialogHeader>
      <form>
        <div className="grid">
          <div className="flex flex-col p-5">
            <Label>
              <h3 className="text-black font-base">User Role</h3>
            </Label>
            <input
              type="text"
              className="mt-2 px-4 py-2 pl-3 block w-full border rounded-xl bg-transparent border-gray-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter role name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
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
                        checked={permissions[perm.id]}
                        onCheckedChange={() => handleToggle(perm.id.toString())}
                        className="bg-gray-400 data-[state=checked]:bg-[#A7C513]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="px-5 pt-5 flex justify-center gap-x-6">
            <DialogClose asChild>
              <Button className="bg-[#EE7A2A] text-white w-[10rem]" onClick={handleSave}>
                Save Changes
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]" onClick={onCancel}>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </div>
      </form>
    </DialogContent>
  );
}
