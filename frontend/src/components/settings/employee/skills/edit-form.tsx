import { useState } from 'react';
import { DialogClose, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface EditSkillFormProps {
  onCancel: () => void;
  onSave: (roleData: { skillName: string; description: string; category: string }) => void;
}

export default function EditSkillForm({ onCancel, onSave }: EditSkillFormProps) {
  const [skillName, setSkillName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSave = () => {
    onSave({ skillName, description, category });
    onCancel();
  };

  return (
    <DialogContent className="w-full lg:!max-w-[45rem] h-fit flex flex-col">
      <DialogHeader>
        <DialogTitle>Create Edit Employee Skill</DialogTitle>
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
                  className="mt-2 px-4 py-2 pl-3 block w-full border rounded-xl bg-transparent border-gray-500 focus:border-[#EE7A2A] sm:text-sm"
                  placeholder="Enter skill name..."
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <Label>
                  <h3 className="text-black font-base">Description</h3>
                </Label>
              </div>
              <div>
                <textarea
                  className="mt-2 px-4 py-2 pl-3 block w-full border rounded-xl bg-transparent border-gray-500 focus:border-[#EE7A2A] sm:text-sm"
                  placeholder="Enter description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <Label>
                  <h3 className="text-black font-base">Skill Category</h3>
                </Label>
              </div>
              <div>
                <Select value={category} onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className="mt-2 px-4 py-2 pl-3 w-full border rounded-xl border-gray-500 focus:border-[#EE7A2A]">
                    <SelectValue placeholder="Choose Category" className="text-gray-500" />
                  </SelectTrigger>
                  <SelectContent className="border rounded-xl border-gray-500 bg-white">
                    <SelectItem value="Beginner" className="hover:bg-gray-300 text-black">
                      Beginner
                    </SelectItem>{' '}
                    {/* Updated text color */}
                    <SelectItem value="Intermediate" className="hover:bg-gray-300 text-black">
                      Intermediate
                    </SelectItem>{' '}
                    {/* Updated text color */}
                    <SelectItem value="Expert" className="hover:bg-gray-300 text-black">
                      Expert
                    </SelectItem>{' '}
                    {/* Updated text color */}
                  </SelectContent>
                </Select>
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
