import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AddSkillForm() {
  return (
    <form action="" method="post">
      <div className="grid">
        <div className="flex flex-col p-5 pb-3">
          <div>
            <Label>
              <h3 className="text-black font-base">Skill Name</h3>
            </Label>
          </div>
          <div>
            <input
              type="text"
              className="mt-2 px-4 py-2 pl-3 w-full border rounded-xl bg-transparent border-gray-500 focus:border-[#EE7A2A] sm:text-sm"
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
              className="mt-2 px-4 py-2 pl-3 w-full border rounded-xl bg-transparent border-gray-500 focus:border-[#EE7A2A] sm:text-sm"
              placeholder="Enter description"
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
            <Select>
              <SelectTrigger className="mt-2 px-4 py-2 pl-3 w-full border rounded-xl border-gray-500 focus:border-[#EE7A2A]">
                <SelectValue placeholder="Choose Category" className="text-gray-500" /> {/* Updated text color */}
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

        <DialogClose asChild>
          <div className=" px-5 pt-5 flex justify-center gap-x-6">
            <Button className="bg-[#EE7A2A] text-white w-[10rem]">Save Changes</Button>
            <Button className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]">Cancel</Button>
          </div>
        </DialogClose>
      </div>
    </form>
  );
}
