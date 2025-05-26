'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { JobPosition } from '@/schemas';
import toast from 'react-hot-toast';
import { DialogClose } from '@radix-ui/react-dialog';

interface EditJobPositionFormProps {
  job_position: JobPosition;
  onCancel: () => void;
  onSave: (updatedJobPosition: JobPosition) => void;
}

export function EditJobPositionForm({ job_position, onCancel, onSave }: EditJobPositionFormProps) {
  const [title, setTitle] = useState(job_position.title);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (job_position) {
      setTitle(job_position.title);
    }
  }, [job_position]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave({ ...job_position, title });
      toast.success('Job Position updated successfully!');
      onCancel();
    } catch (error) {
      toast.error('Error saving job position!');
      console.error('Error saving job position:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Job Position Title
        </label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
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
