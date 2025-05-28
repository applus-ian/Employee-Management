import { TrashIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { EditDocumentInformation } from './edit-document-information';
import { useFetchDocuments } from '@/hooks/records/use-fetch-documents';
import { useDeleteDocument } from '@/hooks/records/use-delete-document';
import { Documentation } from '@/types/records/record';
import { toast } from 'sonner';

interface DocumentationInformationProps {
  employeeId: string;
}

const typeColorMap: Record<string, string> = {
  certificate: 'bg-green-100 text-green-700',
  id: 'bg-yellow-100 text-yellow-700',
  contract: 'bg-purple-100 text-purple-700',
  other: 'bg-gray-200 text-gray-700',
  unknown: 'bg-gray-100 text-gray-700',
};

export function DocumentationInformation({ employeeId }: DocumentationInformationProps) {
  const { data: documentations, isLoading } = useFetchDocuments(employeeId);
  const { mutate: deleteDoc } = useDeleteDocument();

  const handleDelete = (id: number) => {
    deleteDoc(id, {
      onSuccess: () => {
        toast.success('Document deleted successfully');
      },
      onError: () => {
        toast.error('Failed to delete document');
      },
    });
  };

  if (isLoading) {
    return <div>Loading documentations...</div>;
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Uploaded File</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Expiry Date</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {documentations?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-2 text-center text-gray-500">
                  No documentations found
                </td>
              </tr>
            ) : (
              documentations?.map((doc: Documentation) => (
                <tr key={doc.id} className="even:bg-blue-50">
                  <td className="px-4 py-2">
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View File
                    </a>
                  </td>
                  <td className="px-4 py-2">{doc.name}</td>
                  <td className="px-4 py-2">{doc.description}</td>
                  <td className="px-4 py-2">
                    {(() => {
                      const typeName = (
                        doc.document_type && doc.document_type.name ? doc.document_type.name : 'Unknown'
                      )
                        .toLowerCase()
                        .trim();
                      return (
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-semibold ${typeColorMap[typeName] || typeColorMap['unknown']}`}
                        >
                          {doc.document_type && doc.document_type.name ? doc.document_type.name : 'Unknown'}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-4 py-2">
                    <Input
                      type="date"
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                      value={doc.expiry_date}
                      readOnly
                    />
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <EditDocumentInformation document={doc} />
                    <button onClick={() => handleDelete(doc.id)} className="text-red-500 hover:text-red-600 text-lg">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
