import React, { useState } from 'react';
import TagInput from '@pathofdev/react-tag-Input';
import { TrashIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
export const NewEmployeeForm = ({ onCancel }: { onCancel: () => void }) => {
  const [tags, setTags] = useState(['design', 'ux', 'figma']);
  return (
    <div className="p-6 rounded-xl mb-6 pb-6">
      <h1 className="text-2xl font-semibold mb-8">Create New Employee Records</h1>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Row 1 */}
        <div>
          <Label className="block text-sm text-gray-700 mb-1">First Name</Label>
          <Input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <Label className="block text-sm text-gray-700 mb-1">Middle Name</Label>
          <Input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 2 */}
        <div>
          <Label className="block text-sm text-gray-700 mb-1">Last Name</Label>
          <Input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <Label className="block text-sm text-gray-700 mb-1">Suffix</Label>
          <Input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 3 */}
        <div>
          <Label className="block text-sm text-gray-700 mb-1">Email Address</Label>
          <Input
            type="email"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <Label className="block text-sm text-gray-700 mb-1">Phone No.</Label>
          <Input
            type="tel"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 4 */}
        <div>
          <Label className="block text-sm text-gray-700 mb-1">Gender</Label>
          <Select>
            <SelectTrigger className="rounded-xl w-full px-4 py-5 border border-gray-300 hover:border-orange-500">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent className=" bg-white">
              <SelectItem value="ongoing">Male</SelectItem>
              <SelectItem value="completed">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="block text-sm text-gray-700 mb-1">Date of Birth</Label>
          <Input
            type="date"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        <div>
          <Label className="block text-sm text-gray-700 mb-1">Civil Status</Label>
          <Input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 5 */}
        <div>
          <Label className="block text-sm text-gray-700 mb-1">Region</Label>
          <Input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <Label className="block text-sm text-gray-700 mb-1">Province</Label>
          <Input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 6 */}
        <div>
          <Label className="block text-sm text-gray-700 mb-1">City/Municipality</Label>
          <Input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <Label className="block text-sm text-gray-700 mb-1">Barangay</Label>
          <Input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 7 */}
        <div>
          <Label className="block text-sm text-gray-700 mb-1">Street</Label>
          <Input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <Label className="block text-sm text-gray-700 mb-1">Emergency Contact 1</Label>
          <Input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        <div>
          <Label className="block text-sm text-gray-700 mb-1">Emergency Contact 2</Label>
          <Input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 8 */}
        <div className="p-4 border rounded-xl max-w-lg">
          <Label className="block font-medium mb-2">Skills</Label>
          <TagInput tags={tags} onChange={(newTags) => setTags(newTags)} placeholder="Type and press enter" />
        </div>

        {/* Row 9 */}
        <div>
          <Label className="block text-sm text-gray-800 mb-1">Job Position</Label>
          <Input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <Label className="block text-sm text-gray-800 mb-1">Location Assignment</Label>
          <Input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
      </form>

      {/* Upload Documents Section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Upload Documents</h2>
          <button className="border border-orange-500 text-orange-500 px-4 py-1 text-sm rounded-full hover:bg-orange-500 hover:text-white">
            Upload Document
          </button>
        </div>

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
                    <Input type="date" className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full" />
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
      </div>
      {/* Buttons */}
      <div className="col-span-1 md:col-span-2 flex gap-2 mt-10">
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 text-sm">
          Save Employee
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
