import { TrashIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function DocumentationInformation() {
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
            {[...Array(3)].map((_, idx) => (
              <tr key={idx} className="even:bg-blue-50">
                <td className="px-4 py-2">Deloy-Certificate.png</td>
                <td className="px-4 py-2">Figma Certificate</td>
                <td className="px-4 py-2">Cherry Ann Deloy’s Figma Certificate.</td>
                <td className="px-4 py-2">
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">Certificate</span>
                </td>
                <td className="px-4 py-2">
                  <Input type="date" className="border border-gray-300 rounded-md px-2 py-1 text-sm" />
                </td>
                <td className="px-4 py-2">
                  <button className="text-red-500 hover:text-red-600 text-lg">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
