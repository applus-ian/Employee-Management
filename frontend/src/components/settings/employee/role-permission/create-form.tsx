import { useState } from 'react';
import { DialogClose, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface NewRoleFormProps {
  onCancel: () => void;
  onSave: (roleData: { roleName: string; permissions: Record<string, boolean> }) => void;
}

const permissionsList = [
  {
    id: 'update-employee',
    name: 'Update Employee Records',
    description: 'Can update employee records.',
  },
  {
    id: 'set-status',
    name: 'Set Employee Status',
    description: 'Can set employee status.',
  },
  {
    id: 'assign-role',
    name: 'Assign Roles',
    description: 'Can assign roles to employees.',
  },
  {
    id: 'hehe-role',
    name: 'Assign Roles',
    description: 'Can assign roles to employees.',
  },
  {
    id: 'haha-role',
    name: 'Assign Roles',
    description: 'Can assign roles to employees.',
  },
  {
    id: 'hruru-role',
    name: 'Assign Roles',
    description: 'Can assign roles to employees.',
  },
];

export default function NewRoleForm({ onCancel, onSave }: NewRoleFormProps) {
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState<Record<string, boolean>>(
    permissionsList.reduce(
      (acc, perm) => {
        acc[perm.id] = false;
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

  const handleToggle = (id: string) => {
    setPermissions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    onSave({ roleName, permissions });
    onCancel(); // Close the form after saving
  };

  return (
    <DialogContent className="w-full lg:!max-w-[45rem] h-fit flex flex-col">
      <DialogHeader>
        <DialogTitle>Create New Employee Role and Permissions</DialogTitle>
      </DialogHeader>
      <div>
        <form>
          <div className="grid">
            <div className="flex flex-col p-5">
              <div>
                <Label>
                  <h3 className="text-black font-base">User Role</h3>
                </Label>
              </div>
              <div>
                <input
                  type="text"
                  className="mt-2 px-4 py-2 pl-3 block w-full border rounded-xl bg-transparent border-gray-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter role name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                />
              </div>
            </div>
            <div className="p-5">
              <Label htmlFor="airplane-mode">
                <h3 className="text-black font-base">Permissions</h3>
              </Label>
              <div className="mt-2 px-4 py-2 pl-3 block w-full border rounded-xl bg-transparent border-gray-500 focus:border-indigo-500 sm:text-sm">
                <div className="grid lg:grid-cols-2 md:grid-cols-1 py-4 p-3 max-h-80 overflow-y-auto gap-4">
                  {permissionsList.map((perm) => (
                    <div key={perm.id} className="flex flex-col py-2 p-3">
                      <h4 className="text-sm font-medium">{perm.name}</h4>
                      <Separator className="my-4 border border-[#BBD2EC] rounded-xl" />
                      <div className="flex justify-between h-5 space-x-4 text-sm">
                        <div className="text-gray-500">{perm.description}</div>
                        <Switch
                          id={perm.id}
                          checked={permissions[perm.id]}
                          onCheckedChange={() => handleToggle(perm.id)}
                          className="bg-gray-400 data-[state=checked]:bg-[#A7C513]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className=" px-5 pt-5 flex justify-center gap-x-6">
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
      </div>
    </DialogContent>
  );
}
