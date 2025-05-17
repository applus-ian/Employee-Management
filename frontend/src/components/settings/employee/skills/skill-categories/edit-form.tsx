'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SkillCategory } from '@/schemas';

interface EditSkillCategoryFormProps {
  skill_category: SkillCategory;
  onCancel: () => void;
  onSave: (updatedSkillCategory: SkillCategory) => void;
}

export function EditSkillCategoryForm({ skill_category, onCancel, onSave }: EditSkillCategoryFormProps) {
  const [name, setName] = useState(skill_category.name);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  useEffect(() => {
    if (skill_category) {
      setName(skill_category.name);
    }
  }, [skill_category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when saving
    try {
      await onSave({ ...skill_category, name }); // Call onSave with updated data
      onCancel();
    } catch (error) {
      console.error('Error saving skill category:', error); // Handle any error
    } finally {
      setIsLoading(false); // Set loading state to false after saving
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Skill Category Name
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
