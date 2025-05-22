import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePersonalInfoSchema, UpdatePersonalInfoInput } from '@/schemas/profile/personalInformationSchema';
import { useUpdatePersonalInfo } from '@/hooks/profile/use-update-personal-info';
import { AuthContext } from '@/context/AuthContext';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilePenLine } from 'lucide-react';

type Gender = 'male' | 'female' | 'other';
type CivilStatus = 'single' | 'married' | 'divorced' | 'widowed';

export default function EditPersonalInformation() {
  const authContext = useContext(AuthContext);
  const employee = authContext.user?.employee;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdatePersonalInfoInput>({
    resolver: zodResolver(updatePersonalInfoSchema),
    defaultValues: {
      first_name: employee?.first_name || '',
      middle_name: employee?.middle_name || '',
      last_name: employee?.last_name || '',
      suffix: employee?.suffix || '',
      email: employee?.email || '',
      phone_number: employee?.phone_number || '',
      emergency_contact1: employee?.emergency_contact1 || '',
      emergency_contact2: employee?.emergency_contact2 || '',
      gender: (employee?.gender as Gender) || 'male',
      birthdate: employee?.birthdate || '',
      civil_status: (employee?.civil_status as CivilStatus) || 'single',
      nationality: employee?.nationality || '',
    },
  });

  const { mutate, isPending } = useUpdatePersonalInfo();

  const onSubmit = (data: UpdatePersonalInfoInput) => {
    mutate(data);
  };

  const genderValue = watch('gender');
  const civilStatusValue = watch('civil_status');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="order-2">
          <FilePenLine size={22} strokeWidth={2} className="text-[#EE7A2A]" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-full lg:!max-w-[60rem] lg:h-fit md:h-[90vh] sm:h-[90vh] h-[90vh] flex flex-col">
        <DialogHeader className="shrink-0 pb-4">
          <DialogTitle>Edit Personal Information</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto lg:flex-0 lg:px-0 md:flex-1 md:px-5 sm:flex-1 sm:px-5">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* First Name */}
            <div className="flex flex-col p-5">
              <label className="text-gray-600">First Name</label>
              <Input
                className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                {...register('first_name')}
              />
              {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name.message}</span>}
            </div>

            {/* Middle Name */}
            <div className="flex flex-col p-5">
              <label className="text-gray-600">Middle Name</label>
              <Input
                className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                {...register('middle_name')}
              />
              {errors.middle_name && <span className="text-red-500 text-sm">{errors.middle_name.message}</span>}
            </div>

            {/* Last Name */}
            <div className="flex flex-col p-5">
              <label className="text-gray-600">Last Name</label>
              <Input
                className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                {...register('last_name')}
              />
              {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name.message}</span>}
            </div>

            {/* Suffix */}
            <div className="flex flex-col p-5">
              <label className="text-gray-600">Suffix</label>
              <Input
                className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                {...register('suffix')}
              />
              {errors.suffix && <span className="text-red-500 text-sm">{errors.suffix.message}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col p-5">
              <label className="text-gray-600">Email</label>
              <Input
                className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                {...register('email')}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col p-5">
              <label className="text-gray-600">Phone Number</label>
              <Input
                className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                {...register('phone_number')}
              />
              {errors.phone_number && <span className="text-red-500 text-sm">{errors.phone_number.message}</span>}
            </div>

            {/* Gender Select */}
            <div className="flex flex-col p-5">
              <label className="text-gray-600 font-medium">Gender</label>
              <Select
                value={genderValue}
                onValueChange={(value) => {
                  setValue('gender', value as Gender);
                }}
              >
                <SelectTrigger className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>

                <SelectContent className="bg-gray-100">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Civil Status Select */}
            <div className="flex flex-col p-5">
              <label className="text-gray-600 font-medium">Civil Status</label>
              <Select
                value={civilStatusValue}
                onValueChange={(value) => setValue('civil_status', value as CivilStatus)}
              >
                <SelectTrigger className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                  <SelectValue placeholder="Select Civil Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-100">
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Emergency Contact 1 */}
            <div className="flex flex-col p-5">
              <label className="text-gray-600">Emergency Contact 1</label>
              <Input
                className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                {...register('emergency_contact1')}
              />
              {errors.emergency_contact1 && (
                <span className="text-red-500 text-sm">{errors.emergency_contact1.message}</span>
              )}
            </div>

            {/* Emergency Contact 2 */}
            <div className="flex flex-col p-5">
              <label className="text-gray-600">Emergency Contact 2</label>
              <Input
                className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                {...register('emergency_contact2')}
              />
              {errors.emergency_contact2 && (
                <span className="text-red-500 text-sm">{errors.emergency_contact2.message}</span>
              )}
            </div>

            {/* Birthdate */}
            <div className="flex flex-col p-5">
              <label className="text-gray-600">Birthdate</label>
              <Input
                className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                {...register('birthdate')}
                type="date"
              />
              {errors.birthdate && <span className="text-red-500 text-sm">{errors.birthdate.message}</span>}
            </div>

            {/* Nationality */}
            <div className="flex flex-col p-5">
              <label className="text-gray-600">Nationality</label>
              <Input
                className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                {...register('nationality')}
              />
              {errors.nationality && <span className="text-red-500 text-sm">{errors.nationality.message}</span>}
            </div>

            <div className="col-span-full px-5 pt-5 flex justify-center gap-x-6">
              <Button type="submit" disabled={isPending} className="bg-[#EE7A2A] text-white w-[10rem]">
                {isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
