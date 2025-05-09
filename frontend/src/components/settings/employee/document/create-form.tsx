'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useCreateDocumentType } from '@/hooks/settings/employee/document/use-create-document-type';

// Zod Schema
const documentTypeSchema = z.object({
  name: z.string().min(1, 'Document name is required'),
});

// Infer the form type
type DocumentTypeInput = z.infer<typeof documentTypeSchema>;

interface NewDocumentFormProps {
  onCancel: () => void;
  onSave: (data: DocumentTypeInput) => void;
}

export default function NewDocumentForm({ onCancel, onSave }: NewDocumentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DocumentTypeInput>({
    resolver: zodResolver(documentTypeSchema),
  });

  const { mutate: createDocumentType, isPending, isError, error } = useCreateDocumentType();

  const onSubmit = (data: DocumentTypeInput) => {
    createDocumentType(data, {
      onSuccess: () => {
        onSave(data);
        reset(); // Reset form
        onCancel(); // Close dialog
      },
      onError: (error: { message: string }) => {
        console.error('Error creating document type:', error.message);
      },
    });
  };

  return (
    <DialogContent className="w-full lg:!max-w-[45rem] h-fit flex flex-col bg-white">
      <DialogHeader>
        <DialogTitle>Create New Document Type</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-5 py-3">
        <div>
          <Label htmlFor="name">
            <h3 className="text-black font-base">Document Name</h3>
          </Label>
          <Input id="name" {...register('name')} placeholder="Enter document name..." className="mt-2" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {isError && (
          <div className="text-red-600">
            <p>Error creating document type: {error?.message}</p>
          </div>
        )}

        <div className="flex justify-center gap-x-6 pt-3">
          <Button type="submit" className="bg-[#EE7A2A] text-white w-[10rem]" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create'}
          </Button>
          <Button
            type="button"
            className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
