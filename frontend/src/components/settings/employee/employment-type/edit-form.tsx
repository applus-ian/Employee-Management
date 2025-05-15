'use client';

import { useEffect, useState } from 'react';
import { DialogClose, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { EmploymentType } from '@/schemas';

interface EditEmploymentTypeFormProps {
  employment_type: EmploymentType;
  onCancel: () => void;
  onSave: (updatedEmploymentType: EmploymentType) => void;
}

export default function EditEmploymentTypeForm({ employment_type, onCancel, onSave }: EditEmploymentTypeFormProps) {
  const [name, setName] = useState(employment_type.name);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (employment_type) {
      setName(employment_type.name);
    }
  }, [employment_type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave({ ...employment_type, name });
      onCancel();
    } catch (error) {
      console.error('Error saving employment type:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="w-full lg:!max-w-[45rem] h-fit flex flex-col bg-white">
      <DialogHeader>
        <DialogTitle>Update Employment Type</DialogTitle>
      </DialogHeader>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="flex flex-col p-5">
              <div>
                <Label htmlFor="name">
                  <h3 className="text-black font-base">Employment Type Name</h3>
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
