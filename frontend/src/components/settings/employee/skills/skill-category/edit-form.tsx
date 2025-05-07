import { useState } from 'react';
import { DialogClose, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface EditSkillCategoryFormProps {
  onCancel: () => void;
  onSave: (roleData: { skillName: string }) => void;
}

export default function EditSkillCategoryForm({ onCancel, onSave }: EditSkillCategoryFormProps) {
  const [skillName, setSkillName] = useState('');

  const handleSave = () => {
    onSave({ skillName });
    onCancel();
  };

  return (
    <DialogContent className="w-full lg:!max-w-[35rem] h-fit flex flex-col">
      <DialogHeader>
        <DialogTitle>Create Edit Skill Category</DialogTitle>
      </DialogHeader>
      <div>
        <form>
          <div className="grid">
            <div className="flex flex-col p-5">
              <div>
                <Label>
                  <h3 className="text-black font-base">Category Name</h3>
                </Label>
              </div>
              <div>
                <input
                  type="text"
                  className="mt-2 px-4 py-2 pl-3 block w-full border rounded-xl bg-transparent border-gray-500 focus:border-[#EE7A2A] sm:text-sm"
                  placeholder="Enter skill name..."
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                />
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
                  Cancel New
                </Button>
              </DialogClose>
            </div>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
