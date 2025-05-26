import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Documentation } from '@/types/records/record';
import { updateDocumentation } from '@/utils/api/records/fetchDocuments';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

const documentEditSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  document_type_id: z.string().min(1, 'Type is required'),
  expiry_date: z.string().optional(),
  file_url: z.string().url('File URL is required'),
});

type DocumentEditInput = z.infer<typeof documentEditSchema>;

interface EditDocumentInformationProps {
  document: Documentation;
}

export function EditDocumentInformation({ document }: EditDocumentInformationProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DocumentEditInput>({
    resolver: zodResolver(documentEditSchema),
    defaultValues: {
      name: document.name,
      description: document.description,
      document_type_id: document.document_type_id?.toString(),
      expiry_date: document.expiry_date,
      file_url: document.file_url,
    },
  });

  const onSubmit = async (data: DocumentEditInput) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await updateDocumentation(document.id.toString(), data as any);
      toast.success('Document updated successfully');
      queryClient.invalidateQueries({ queryKey: ['documentations'] });
      setOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to update document');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="text-blue-500 hover:text-blue-700">
          <Edit2 size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white w-[90vw] max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Document</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <Input {...register('name')} />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <Input {...register('description')} />
            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
            <Input {...register('document_type_id')} />
            {errors.document_type_id && <span className="text-red-500 text-sm">{errors.document_type_id.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File URL</label>
            <Input {...register('file_url')} />
            {errors.file_url && <span className="text-red-500 text-sm">{errors.file_url.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <Input type="date" {...register('expiry_date')} />
            {errors.expiry_date && <span className="text-red-500 text-sm">{errors.expiry_date.message}</span>}
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#EE7A2A] text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
