'use client';

import { useEffect, useState } from 'react';
import { DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ProjectRole } from '@/schemas';
import { Input } from '@/components/ui/input';
interface EditProjectRoleFormProps {
  project_role: ProjectRole;
  onCancel: () => void;
  onSave: (updatedProjectRole: ProjectRole) => void;
}

export function EditProjectRoleForm({ project_role, onCancel, onSave }: EditProjectRoleFormProps) {
  const [name, setName] = useState(project_role.name);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  useEffect(() => {
    if (project_role) {
      setName(project_role.name);
    }
  }, [project_role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when saving
    try {
      await onSave({ ...project_role, name }); // Call onSave with updated data
      onCancel();
    } catch (error) {
      console.error('Error saving project role:', error); // Handle any error
    } finally {
      setIsLoading(false); // Set loading state to false after saving
    }
  };

  return (
    <DialogContent className="w-full lg:!max-w-[45rem] h-fit flex flex-col bg-white">
      <DialogHeader>
        <DialogTitle>Edit Project Role</DialogTitle>
      </DialogHeader>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="flex flex-col p-5">
              <div>
                <Label>
                  <h3 className="text-black font-base">Project Role Name</h3>
                </Label>
              </div>
              <div>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>

            <div className=" px-5 pt-5 flex justify-center gap-x-6">
              <Button
                type="submit"
                className="bg-[#EE7A2A] text-white hover:bg-[#d4681f]"
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? 'Saving...' : 'Save'} {/* Show loading text when saving */}
              </Button>

              <Button className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
