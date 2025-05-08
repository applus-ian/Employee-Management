import { useState } from 'react';
import { DialogClose, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EditDepartmentAssignFormProps {
  onCancel: () => void;
  onSave: (department_assignData: { department_assignName: string; parent_departmentName: string }) => void;
}

export default function EditDepartmentAssignForm({ onCancel, onSave }: EditDepartmentAssignFormProps) {
  const [department_assignName, setDepartment_AssignName] = useState('');
  const [parent_departmentName, setParent_DepartmentName] = useState('');

  const handleSave = () => {
    onSave({ department_assignName, parent_departmentName });
    onCancel();
  };

  return (
    <DialogContent className="w-full lg:!max-w-[35rem] h-fit flex flex-col bg-white">
      <DialogHeader>
        <DialogTitle>Update Department Assignment</DialogTitle>
      </DialogHeader>
      <div>
        <form>
          <div className="grid">
            <div className="flex flex-col p-5">
              <div>
                <Label>
                  <h3 className="text-black font-base">Department Name</h3>
                </Label>
              </div>
              <div>
                <input
                  type="text"
                  className="mt-2 px-4 py-2 pl-3 block w-full border rounded-xl bg-transparent border-gray-500 focus:border-[#EE7A2A] sm:text-sm"
                  placeholder="Enter department name..."
                  value={department_assignName}
                  onChange={(e) => setDepartment_AssignName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col p-5 pt-2">
              <div>
                <Label>
                  <h3 className="text-black font-base">Parent Department</h3>
                </Label>
              </div>

              <div>
                <Select value={parent_departmentName} onValueChange={(value) => setParent_DepartmentName(value)}>
                  <SelectTrigger className="mt-2 px-4 py-2 pl-3 w-full border rounded-xl border-gray-500 focus:border-[#EE7A2A]">
                    <SelectValue placeholder="Choose parent department" className="text-gray-500" />
                  </SelectTrigger>
                  <SelectContent className="border rounded-xl border-gray-500 bg-white">
                    <SelectItem value="Information Technology" className="hover:bg-gray-300 text-black">
                      Information Technology
                    </SelectItem>{' '}
                    <SelectItem value="Finance" className="hover:bg-gray-300 text-black">
                      Finance
                    </SelectItem>{' '}
                    <SelectItem value="Human Resource" className="hover:bg-gray-300 text-black">
                      Human Resource
                    </SelectItem>{' '}
                    <SelectItem value="IT Support" className="hover:bg-gray-300 text-black">
                      IT Support
                    </SelectItem>{' '}
                    <SelectItem value="Engineering" className="hover:bg-gray-300 text-black">
                      Engineering
                    </SelectItem>{' '}
                    <SelectItem value="Backend" className="hover:bg-gray-300 text-black">
                      Backend
                    </SelectItem>{' '}
                    <SelectItem value="DevOps" className="hover:bg-gray-300 text-black">
                      DevOps
                    </SelectItem>{' '}
                    <SelectItem value="Flower" className="hover:bg-gray-300 text-black">
                      Flower
                    </SelectItem>{' '}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className=" px-5 pt-5 flex justify-center gap-x-6">
              <DialogClose asChild>
                <Button className="bg-[#EE7A2A] text-white w-[10rem]" onClick={handleSave}>
                  Update
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
