'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { JobPosition } from '@/schemas';

interface EditJobPositionFormProps {
  job_position: JobPosition;
  onCancel: () => void;
  onSave: (updatedJobPosition: JobPosition) => void;
}

export function EditJobPositionForm({ job_position, onCancel, onSave }: EditJobPositionFormProps) {
  const [title, setTitle] = useState(job_position.title);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  useEffect(() => {
    if (job_position) {
      setTitle(job_position.title);
    }
  }, [job_position]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when saving
    try {
      await onSave({ ...job_position, title }); // Call onSave with updated data
      onCancel();
    } catch (error) {
      console.error('Error saving job position:', error); // Handle any error
    } finally {
      setIsLoading(false); // Set loading state to false after saving
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
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-[#EE7A2A] text-white hover:bg-[#d4681f]"
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? 'Saving...' : 'Save'} {/* Show loading text when saving */}
        </Button>
      </div>
    </form>
  );
}
