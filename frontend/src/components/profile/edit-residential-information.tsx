'use client';

import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilePenLine } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { AuthContext } from '@/context/AuthContext';
import { updateResidentialInfoSchema, UpdateResidentialInfoInput } from '@/schemas/residentialInformationSchema';
import { useUpdateResidentialInfo } from '@/hooks/use-update-residential-info';
import PSGCSelect from './psgc-select';

export default function EditResidentialInformation() {
  const { user } = useContext(AuthContext);
  const employee = user?.employee;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateResidentialInfoInput>({
    resolver: zodResolver(updateResidentialInfoSchema),
    defaultValues: {
      region: employee?.region || '',
      province: employee?.province || '',
      city_or_municipality: employee?.city_or_municipality || '',
      barangay: employee?.barangay || '',
      street: employee?.street || '',
    },
  });

  const { mutate } = useUpdateResidentialInfo();

  const onSubmit = (data: UpdateResidentialInfoInput) => {
    mutate(data);
  };

  const handleFieldChange = (field: string, value: string) => {
    setValue(field as keyof UpdateResidentialInfoInput, value);
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
          <DialogTitle>Edit Residential Information</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 px-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* PSGC Selector */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="col-span-full flex flex-col">
                <PSGCSelect
                  initialRegion={employee?.region}
                  initialProvince={employee?.province}
                  initialCity={employee?.city_or_municipality}
                  initialBarangay={employee?.barangay}
                  onChange={handleFieldChange}
                  onRegionChange={(value) => setValue('region', value)}
                  onProvinceChange={(value) => setValue('province', value)}
                  onCityChange={(value) => setValue('city_or_municipality', value)}
                  onBarangayChange={(value) => setValue('barangay', value)}
                />

                {/* Error messages */}
                {errors.region && <span className="text-red-500 text-sm mt-1">{errors.region.message}</span>}
                {errors.province && <span className="text-red-500 text-sm mt-1">{errors.province.message}</span>}
                {errors.city_or_municipality && (
                  <span className="text-red-500 text-sm mt-1">{errors.city_or_municipality.message}</span>
                )}
                {errors.barangay && <span className="text-red-500 text-sm mt-1">{errors.barangay.message}</span>}
              </div>

              {/* Street Field */}
              <div className="col-span-full">
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                  Street
                </label>
                <input
                  id="street"
                  type="text"
                  {...register('street')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                {errors.street && <span className="text-red-500 text-sm mt-1">{errors.street.message}</span>}
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
