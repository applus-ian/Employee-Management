import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, TrashIcon, UploadIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Documentation } from '@/types/records/record';
import { updateDocumentation } from '@/utils/api/records/fetchDocumentation';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const documentEditSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  document_type_id: z.string().min(1, 'Type is required'),
  expiry_date: z.string().optional(),
  file: z.instanceof(File).optional(),
});

type DocumentEditInput = z.infer<typeof documentEditSchema>;

interface EditDocumentInformationProps {
  document: Documentation;
}

export function EditDocumentInformation({ document }: EditDocumentInformationProps) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<DocumentEditInput>({
    resolver: zodResolver(documentEditSchema),
    defaultValues: {
      name: document.name,
      description: document.description,
      document_type_id: document.document_type?.id?.toString(),
      expiry_date: document.expiry_date,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue('file', file);
    }
  };

  const onSubmit = async (data: DocumentEditInput) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description || '');
      formData.append('document_type_id', data.document_type_id);
      if (data.expiry_date) {
        formData.append('expiry_date', data.expiry_date);
      }
      if (data.file) {
        formData.append('file', data.file);
      }

      await updateDocumentation(document.id, formData);
      toast.success('Document updated successfully');
      queryClient.invalidateQueries({ queryKey: ['documentations'] });
      setOpen(false);
      setSelectedFile(null);
    } catch (error) {
      toast.error('Failed to update document');
      console.log(error);
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
            <Label className="block text-sm text-gray-700 mb-1">Select New File (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                onChange={handleFileChange}
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
              />
              {selectedFile && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setValue('file', undefined);
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              )}
            </div>
            {selectedFile && <p className="text-sm text-gray-500 mt-1">Selected: {selectedFile.name}</p>}
            {!selectedFile && (
              <p className="text-sm text-gray-500 mt-1">
                Current file:{' '}
                <a
                  href={document.file_url}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View File
                </a>
              </p>
            )}
          </div>

          <div>
            <Label className="block text-sm text-gray-700 mb-1">Name</Label>
            <Input {...register('name')} />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          <div>
            <Label className="block text-sm text-gray-700 mb-1">Description</Label>
            <Input {...register('description')} />
            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
          </div>

          <div>
            <Label className="block text-sm text-gray-700 mb-1">Document Type</Label>
            <Controller
              name="document_type_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="rounded-xl w-full px-4 py-5 border border-gray-300 hover:border-orange-500">
                    <SelectValue placeholder="Select Document Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="1">Certificate</SelectItem>
                    <SelectItem value="2">ID</SelectItem>
                    <SelectItem value="3">Contract</SelectItem>
                    <SelectItem value="4">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.document_type_id && <span className="text-red-500 text-sm">{errors.document_type_id.message}</span>}
          </div>

          <div>
            <Label className="block text-sm text-gray-700 mb-1">Expiry Date</Label>
            <Input type="date" {...register('expiry_date')} />
            {errors.expiry_date && <span className="text-red-500 text-sm">{errors.expiry_date.message}</span>}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
                setSelectedFile(null);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#EE7A2A] text-white flex items-center gap-2">
              <UploadIcon className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
