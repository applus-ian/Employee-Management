import { useState } from 'react';
import { DialogClose, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface NewOfficeAssignFormProps {
  onCancel: () => void;
  onSave: (office_assignData: { office_assignName: string }) => void;
}

export default function NewOfficeAssignForm({ onCancel, onSave }: NewOfficeAssignFormProps) {
  const [office_assignName, setOffice_AssignName] = useState('');

  const handleSave = () => {
    onSave({ office_assignName });
    onCancel();
  };

  return (
    <DialogContent className="w-full lg:!max-w-[35rem] h-fit flex flex-col bg-white">
      <DialogHeader>
        <DialogTitle>Create New Office Assignment</DialogTitle>
      </DialogHeader>
      <div>
        <form>
          <div className="grid">
            <div className="flex flex-col p-5">
              <div>
                <Label>
                  <h3 className="text-black font-base">Office Name</h3>
                </Label>
              </div>
              <div>
                <input
                  type="text"
                  className="mt-2 px-4 py-2 pl-3 block w-full border rounded-xl bg-transparent border-gray-500 focus:border-[#EE7A2A] sm:text-sm"
                  placeholder="Enter office name..."
                  value={office_assignName}
                  onChange={(e) => setOffice_AssignName(e.target.value)}
                />
              </div>
            </div>

            <div className=" px-5 pt-5 flex justify-center gap-x-6">
              <DialogClose asChild>
                <Button className="bg-[#EE7A2A] text-white w-[10rem]" onClick={handleSave}>
                  Create
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
