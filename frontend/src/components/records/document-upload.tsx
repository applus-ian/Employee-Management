import React, { useState } from 'react';
import { TrashIcon, UploadIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { createDocumentation } from '@/utils/api/records/fetchDocuments';
import { useQueryClient } from '@tanstack/react-query';

const documentUploadSchema = z.object({
  name: z.string().min(1, 'Document name is required'),
  description: z.string().min(1, 'Description is required'),
  document_type_id: z.string().min(1, 'Document type is required'),
  file: z.instanceof(File, { message: 'Please select a file to upload' }),
  upload_date: z.string().min(1, 'Upload date is required'),
  expiry_date: z.string().optional(),
});

type DocumentUploadFormData = z.infer<typeof documentUploadSchema>;

interface DocumentUploadProps {
  employeeId: string;
}

export const DocumentUpload = ({ employeeId }: DocumentUploadProps) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<DocumentUploadFormData>({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: {
      upload_date: new Date().toISOString().split('T')[0],
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue('file', file);
    }
  };

  const onSubmit = async (data: DocumentUploadFormData) => {
    try {
      const formData = new FormData();
      formData.append('employee_id', employeeId);
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('document_type_id', data.document_type_id);
      formData.append('file', data.file);
      formData.append('upload_date', data.upload_date);
      if (data.expiry_date) {
        formData.append('expiry_date', data.expiry_date);
      }

      await createDocumentation(formData);
      toast.success('Document uploaded successfully');
      queryClient.invalidateQueries({ queryKey: ['documentations'] });
      reset();
      setSelectedFile(null);
      setOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to upload document');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="border border-orange-500 text-orange-500 px-4 py-1 text-sm rounded-full hover:bg-orange-500 hover:text-white">
          Upload Document
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label className="block text-sm text-gray-700 mb-1">Select File</Label>
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
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setValue('file', null as any);
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              )}
            </div>
            {selectedFile && <p className="text-sm text-gray-500 mt-1">Selected: {selectedFile.name}</p>}
            {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>}
          </div>

          <div>
            <Label className="block text-sm text-gray-700 mb-1">Document Name</Label>
            <Input
              {...register('name')}
              type="text"
              className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label className="block text-sm text-gray-700 mb-1">Description</Label>
            <Input
              {...register('description')}
              type="text"
              className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
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
            {errors.document_type_id && <p className="text-red-500 text-xs mt-1">{errors.document_type_id.message}</p>}
          </div>

          <div>
            <Label className="block text-sm text-gray-700 mb-1">Upload Date</Label>
            <Input
              {...register('upload_date')}
              type="date"
              className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
            />
            {errors.upload_date && <p className="text-red-500 text-xs mt-1">{errors.upload_date.message}</p>}
          </div>

          <div>
            <Label className="block text-sm text-gray-700 mb-1">Expiry Date (Optional)</Label>
            <Input
              {...register('expiry_date')}
              type="date"
              className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setSelectedFile(null);
              }}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedFile}
              className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 text-sm disabled:opacity-50 flex items-center gap-2"
            >
              <UploadIcon className="w-4 h-4" />
              Add Document
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
