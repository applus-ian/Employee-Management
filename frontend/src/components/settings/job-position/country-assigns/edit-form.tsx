'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CountryAssign } from '@/schemas';

interface EditCountryAssignFormProps {
  country_assign: CountryAssign;
  onCancel: () => void;
  onSave: (updatedCountryAssign: CountryAssign) => void;
}

export function EditCountryAssignForm({ country_assign, onCancel, onSave }: EditCountryAssignFormProps) {
  const [name, setName] = useState(country_assign.name);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  useEffect(() => {
    if (country_assign) {
      setName(country_assign.name);
    }
  }, [country_assign]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when saving
    try {
      await onSave({ ...country_assign, name }); // Call onSave with updated data
      onCancel();
    } catch (error) {
      console.error('Error saving country assign:', error); // Handle any error
    } finally {
      setIsLoading(false); // Set loading state to false after saving
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Country Assign Name
        </label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
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
