'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DocumentType } from '@/schemas';

interface EditDocumentTypeFormProps {
  document_type: DocumentType;
  onCancel: () => void;
  onSave: (updatedDocumentType: DocumentType) => void;
}

export function EditDocumentTypeForm({ document_type, onCancel, onSave }: EditDocumentTypeFormProps) {
  const [name, setName] = useState(document_type.name);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  useEffect(() => {
    if (document_type) {
      setName(document_type.name);
    }
  }, [document_type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when saving
    try {
      await onSave({ ...document_type, name }); // Call onSave with updated data
      onCancel();
    } catch (error) {
      console.error('Error saving document type:', error); // Handle any error
    } finally {
      setIsLoading(false); // Set loading state to false after saving
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Document Type Name
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
