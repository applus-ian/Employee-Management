import { useState } from 'react';
import { DialogClose, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface NewEmploymentTypeFormProps {
  onCancel: () => void;
  onSave: (employment_typeData: { employment_typeName: string }) => void;
}

export default function NewEmploymentTypeForm({ onCancel, onSave }: NewEmploymentTypeFormProps) {
  const [employment_typeName, setEmploymentTypeName] = useState('');

  const handleSave = () => {
    onSave({ employment_typeName });
    onCancel();
  };

  return (
    <DialogContent className="w-full lg:!max-w-[45rem] h-fit flex flex-col bg-white">
      <DialogHeader>
        <DialogTitle>Create New Employment Type</DialogTitle>
      </DialogHeader>
      <div>
        <form>
          <div className="grid">
            <div className="flex flex-col p-5">
              <div>
                <Label>
                  <h3 className="text-black font-base">Employment Type Name</h3>
                </Label>
              </div>
              <div>
                <input
                  type="text"
                  className="mt-2 px-4 py-2 pl-3 block w-full border rounded-xl bg-transparent border-gray-500 focus:border-[#EE7A2A] sm:text-sm"
                  placeholder="Enter employment type name..."
                  value={employment_typeName}
                  onChange={(e) => setEmploymentTypeName(e.target.value)}
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
