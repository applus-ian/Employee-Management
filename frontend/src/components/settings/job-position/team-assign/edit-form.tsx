'use client';

import { useEffect, useState } from 'react';
import { DialogClose, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TeamAssign } from '@/schemas';

interface EditTeamAssignFormProps {
  team_assign: TeamAssign;
  onCancel: () => void;
  onSave: (updatedTeamAssign: TeamAssign) => void;
}

export default function EditTeamAssignForm({ team_assign, onCancel, onSave }: EditTeamAssignFormProps) {
  const [name, setName] = useState(team_assign.name);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (team_assign) {
      setName(team_assign.name);
    }
  }, [team_assign]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave({ ...team_assign, name });
      onCancel();
    } catch (error) {
      console.error('Error saving team assignment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="w-full lg:!max-w-[35rem] h-fit flex flex-col">
      <DialogHeader>
        <DialogTitle>Update Team Assignment</DialogTitle>
      </DialogHeader>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="flex flex-col p-5">
              <div>
                <Label>
                  <h3 className="text-black font-base">Team Name</h3>
                </Label>
              </div>
              <div>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>

            <div className=" px-5 pt-5 flex justify-center gap-x-6">
              <Button type="submit" className="bg-[#EE7A2A] text-white w-[10rem]" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update'}
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
