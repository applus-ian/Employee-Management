'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OfficeAssign } from '@/schemas';
import toast from 'react-hot-toast';
import { DialogClose } from '@/components/ui/dialog';

interface EditOfficeAssignFormProps {
  office_assign: OfficeAssign;
  onCancel: () => void;
  onSave: (updatedOfficeAssign: OfficeAssign) => void;
}

export function EditOfficeAssignForm({ office_assign, onCancel, onSave }: EditOfficeAssignFormProps) {
  const [name, setName] = useState(office_assign.name);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  useEffect(() => {
    if (office_assign) {
      setName(office_assign.name);
    }
  }, [office_assign]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave({ ...office_assign, name });
      toast.success('Office assignment updated successfully!');
      onCancel();
    } catch (error) {
      toast.error('Error saving office assign!');
      console.error('Error saving office assign:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Office Assign Name
        </label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="flex justify-end space-x-2">
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" className="bg-[#EE7A2A] text-white hover:bg-[#d4681f]" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
