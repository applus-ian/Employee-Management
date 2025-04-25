import { DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Skill } from '../employeesettings';

interface EditSkillFormProps {
  selectedRow: Skill;
  setSelectedRow: React.Dispatch<React.SetStateAction<Skill | null>>;
}

const EditSkillForm = ({ selectedRow, setSelectedRow }: EditSkillFormProps) => {
  return (
    <form action="" method="post">
      <div className="grid">
        <div className="flex flex-col p-5">
          <div>
            <Label>
              <h3 className="text-black font-base">Skill Name</h3>
            </Label>
          </div>
          <div>
            <input
              type="text"
              value={selectedRow.name || ''} // Pre-fill with the selected row's data
              onChange={(e) => setSelectedRow({ ...selectedRow, name: e.target.value })}
              className="mt-2 px-4 py-2 pl-3 block w-full border rounded-xl bg-transparent border-gray-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter skill name"
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
              value={selectedRow.Description || ''} // Pre-fill with the selected row's data
              onChange={(e) => setSelectedRow({ ...selectedRow, Description: e.target.value })}
              className="mt-2 px-4 py-2 pl-3 block w-full border rounded-xl bg-transparent border-gray-500 focus:border-indigo-500 sm:text-sm h-20 text-start"
              placeholder="Enter description"
            />
          </div>
        </div>
        <div className="flex flex-col p-5">
          <div>
            <Label>
              <h3 className="text-black font-base">Category</h3>
            </Label>
          </div>
          <div>
            <select
              value={selectedRow.Category || ''} // Pre-fill with the selected row's data
              onChange={(e) => setSelectedRow({ ...selectedRow, Category: e.target.value })}
              className="mt-2 px-4 py-2 block w-full border rounded-xl bg-transparent border-gray-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
        <DialogClose asChild>
          <div className="px-5 pt-5 flex justify-center gap-x-6">
            <Button className="bg-[#EE7A2A] text-white w-[10rem]">Save Changes</Button>
            <Button className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]">Cancel</Button>
          </div>
        </DialogClose>
      </div>
    </form>
  );
};

export default EditSkillForm;
