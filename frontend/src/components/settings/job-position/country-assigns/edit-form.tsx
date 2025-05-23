'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CountryAssign } from '@/schemas';
import toast from 'react-hot-toast';

interface EditCountryAssignFormProps {
  country_assign: CountryAssign;
  onCancel: () => void;
  onSave: (updatedCountryAssign: CountryAssign) => void;
}

export function EditCountryAssignForm({ country_assign, onCancel, onSave }: EditCountryAssignFormProps) {
  const [name, setName] = useState(country_assign.name);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (country_assign) {
      setName(country_assign.name);
    }
  }, [country_assign]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave({ ...country_assign, name });
      toast.success('Country Assign Updated!');
      onCancel();
    } catch (error) {
      toast.error('Error saving country assign:');
      console.error('Error saving country assign:', error);
    } finally {
      setIsLoading(false);
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
        <Button type="submit" className="bg-[#EE7A2A] text-white hover:bg-[#d4681f]" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
