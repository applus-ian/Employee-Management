'use client';

import { useEffect, useState } from 'react';
import { DialogClose, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DepartmentAssign } from '@/schemas';

interface EditDepartmentAssignFormProps {
  department_assign: DepartmentAssign;
  onCancel: () => void;
  onSave: (updatedDepartmentAssign: DepartmentAssign) => void;
}

export default function EditDepartmentAssignForm({
  department_assign,
  onCancel,
  onSave,
}: EditDepartmentAssignFormProps) {
  const [departmentAssignName, setDepartmentAssignName] = useState('');
  const [parentDepartmentName, setParentDepartmentName] = useState('');

  useEffect(() => {
    if (department_assign) {
      setDepartmentAssignName(department_assign.name || '');
      setParentDepartmentName(department_assign.parent_name || '');
    }
  }, [department_assign]);

  const handleSave = () => {
    onSave({
      ...department_assign,
      name: departmentAssignName,
      parent_name: parentDepartmentName,
    });
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
            {/* Department Name Field */}
            <div className="flex flex-col p-5">
              <Label>
                <h3 className="text-black font-base">Department Name</h3>
              </Label>
              <Input
                className="mt-2"
                value={departmentAssignName}
                onChange={(e) => setDepartmentAssignName(e.target.value)}
                placeholder="Enter department name..."
              />
            </div>

            {/* Parent Department Select */}
            <div className="flex flex-col p-5 pt-2">
              <Label>
                <h3 className="text-black font-base">Parent Department</h3>
              </Label>
              <Select value={parentDepartmentName} onValueChange={setParentDepartmentName}>
                <SelectTrigger className="mt-2 px-4 py-2 pl-3 w-full border rounded-xl border-gray-500 focus:border-[#EE7A2A]">
                  <SelectValue placeholder="Choose parent department" />
                </SelectTrigger>
                <SelectContent className="border rounded-xl border-gray-500 bg-white">
                  {[
                    'Information Technology',
                    'Finance',
                    'Human Resource',
                    'IT Support',
                    'Engineering',
                    'Backend',
                    'DevOps',
                    'Flower',
                  ].map((dept) => (
                    <SelectItem key={dept} value={dept} className="hover:bg-gray-300 text-black">
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="px-5 pt-5 flex justify-center gap-x-6">
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
