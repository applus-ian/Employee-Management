import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilePenLine } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { useRecord } from '@/hooks/records/use-fetch-record';
import { updateGovBankNumberSchema, UpdateGovBankNumberInput } from '@/schemas/profile/govBankNumberSchema';
import { useUpdateGovBankNumbers } from '@/hooks/records/use-update-gov-bank-numbers';

export default function EditGovBankNumbers({ user_id }: { user_id: string }) {
  const { data: user } = useRecord(user_id);
  const employee = user?.employee;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateGovBankNumberInput>({
    resolver: zodResolver(updateGovBankNumberSchema),
    defaultValues: {
      tin_number: employee?.tin_number || '',
      sss_number: employee?.sss_number || '',
      pagibig_number: employee?.pagibig_number || '',
      philhealth_number: employee?.philhealth_number || '',
      bank_number: employee?.bank_number || '',
    },
  });

  const { mutate } = useUpdateGovBankNumbers();

  const onSubmit = (data: UpdateGovBankNumberInput) => {
    mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="order-2" aria-label="Edit Residential Info">
          <FilePenLine size={22} strokeWidth={2} className="text-[#EE7A2A]" />
        </button>
      </DialogTrigger>

      <DialogContent className="w-full lg:!max-w-[60rem] h-[90vh] flex flex-col">
        <DialogHeader className="shrink-0 pb-4">
          <DialogTitle>Edit Government and Bank Numbers</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 px-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Tin Field */}
              <div className="col-span-full">
                <label htmlFor="tin_number" className="block text-sm font-medium text-gray-700 mb-1">
                  Taxpayer Identification Number
                </label>
                <input
                  id="tin_number"
                  type="text"
                  {...register('tin_number')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                {errors.tin_number && <span className="text-red-500 text-sm mt-1">{errors.tin_number.message}</span>}
              </div>

              {/* SSS Field */}
              <div className="col-span-full">
                <label htmlFor="sss_number" className="block text-sm font-medium text-gray-700 mb-1">
                  Social Security System Number
                </label>
                <input
                  id="sss_number"
                  type="text"
                  {...register('sss_number')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                {errors.sss_number && <span className="text-red-500 text-sm mt-1">{errors.sss_number.message}</span>}
              </div>

              {/* Pagibig Field */}
              <div className="col-span-full">
                <label htmlFor="pagibig_number" className="block text-sm font-medium text-gray-700 mb-1">
                  Pag-IBIG Number
                </label>
                <input
                  id="pagibig_number"
                  type="text"
                  {...register('pagibig_number')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                {errors.pagibig_number && (
                  <span className="text-red-500 text-sm mt-1">{errors.pagibig_number.message}</span>
                )}
              </div>

              {/* Philhealth Field */}
              <div className="col-span-full">
                <label htmlFor="philhealth_number" className="block text-sm font-medium text-gray-700 mb-1">
                  Philhealth Number
                </label>
                <input
                  id="philhealth_number"
                  type="text"
                  {...register('philhealth_number')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                {errors.philhealth_number && (
                  <span className="text-red-500 text-sm mt-1">{errors.philhealth_number.message}</span>
                )}
              </div>

              {/* Bank Field */}
              <div className="col-span-full">
                <label htmlFor="bank_number" className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Account Number
                </label>
                <input
                  id="bank_number"
                  type="text"
                  {...register('bank_number')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                {errors.bank_number && <span className="text-red-500 text-sm mt-1">{errors.bank_number.message}</span>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-5 flex justify-center gap-x-6">
              <Button type="submit" className="bg-[#EE7A2A] text-white w-[10rem]">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
