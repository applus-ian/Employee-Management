import React, { useState, useEffect } from 'react';
import { Check, ChevronsUpDown, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createEmployeeSchema } from '@/schemas/records/createEmployee';
import { CreateEmployeeData } from '@/types/records/createEmployee';
import { useCreateRecord } from '@/hooks/records/use-create-record';
import { toast } from 'react-hot-toast';
import { ActivateAccountForm } from './activate-account-form';
import { SkillDialog, TemporarySkill } from './skill-dialog';
import PSGCSelect from './psgc-select';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useJobPositions } from '@/hooks/settings/employee/job-position/use-fetch-job-position';
import {
  useCountries,
  useOffices,
  useTeams,
  useDepartments,
} from '@/hooks/settings/employee/location-assignment/use-fetch-location-assignment';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { useDocumentType } from '@/hooks/settings/employee/document-type/use-fetch-document-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Document = {
  id: string;
  name: string;
  type: string;
  type_id: string;
  expiry_date?: string;
  file?: File;
};

const steps = [
  { id: 1, title: 'Personal Information', icon: '👤' },
  { id: 2, title: 'Residential Information', icon: '📍' },
  { id: 3, title: 'Emergency Contacts', icon: '🚨' },
  { id: 4, title: 'Employment Information', icon: '💼' },
  { id: 5, title: 'Government & Bank Information', icon: '📄' },
  { id: 6, title: 'Required Documents', icon: '📎' },
];

type StepValidation = {
  [key in 1 | 2 | 3 | 4 | 5 | 6]: (keyof CreateEmployeeData)[];
};

// Define required fields for each step
const stepValidation: StepValidation = {
  1: ['first_name', 'last_name', 'email', 'phone_number', 'gender', 'birthdate', 'civil_status', 'nationality'],
  2: ['region', 'province', 'city_or_municipality', 'barangay', 'street'],
  3: ['emergency_contact1_name', 'emergency_contact1_relationship', 'emergency_contact1_phone_number'],
  4: ['date_hired', 'job_position_id', 'employment_type_id'],
  5: ['sss_number', 'philhealth_number', 'pagibig_number', 'tin_number'],
  6: [],
};

export const NewEmployeeForm = ({ onCancel }: { onCancel: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [createdEmployeeId, setCreatedEmployeeId] = useState<string | null>(null);
  const [temporarySkills, setTemporarySkills] = useState<TemporarySkill[]>([]);
  const [openJobPosition, setOpenJobPosition] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openOffice, setOpenOffice] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const { mutate: createRecord, isPending } = useCreateRecord();
  const { data: jobPositions = [] } = useJobPositions();
  const { data: countries = [] } = useCountries();
  const { data: offices = [] } = useOffices();
  const { data: teams = [] } = useTeams();
  const { data: departments = [] } = useDepartments();
  const router = useRouter();
  const [isAddingDocument, setIsAddingDocument] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [deletingDocumentId, setDeletingDocumentId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);

  const form = useForm<CreateEmployeeData>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      gender: 'male',
      birthdate: '',
      civil_status: 'single',
      nationality: '',
      region: '',
      province: '',
      city_or_municipality: '',
      barangay: '',
      street: '',
      emergency_contact1_name: '',
      emergency_contact1_relationship: '',
      emergency_contact1_phone_number: '',
      date_hired: '',
      job_position_id: 0,
      employment_type_id: 0,
      location_assignment: {
        country_assign_id: undefined,
        office_assign_id: undefined,
        team_assign_id: undefined,
        department_assign_id: undefined,
      },
      employee_skills: [],
      sss_number: null,
      philhealth_number: null,
      pagibig_number: null,
      tin_number: null,
      bank_number: null,
      uploaded_documentations: [],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    trigger,
  } = form;

  const handleSkillAdd = (skill: TemporarySkill) => {
    setTemporarySkills((prev) => [...prev, skill]);
  };

  const handleSkillRemove = (skillId: string) => {
    setTemporarySkills((prev) => prev.filter((skill) => skill.id !== skillId));
  };

  const onSubmit: SubmitHandler<CreateEmployeeData> = async (data) => {
    try {
      // Convert temporarySkills to the format expected by the API
      const formattedSkills = temporarySkills.map((skill) => ({
        skill_id: parseInt(skill.id), // Convert string ID to number
        years_of_experience: parseInt(skill.years_of_experience), // Convert string to number
      }));

      // Add the skills to the form data
      const formDataWithSkills = {
        ...data,
        employee_skills: formattedSkills,
      };

      console.log('Submitting form data:', formDataWithSkills);

      createRecord(formDataWithSkills, {
        onSuccess: (response) => {
          if (response && response?.employee_id) {
            setCreatedEmployeeId(response.employee_id);
            toast.success('Employee created successfully');
            router.push('/records');
          } else {
            toast.error('Invalid response from server');
          }
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to create employee');
        },
      });
    } catch (error) {
      console.error('Error creating employee:', error);
      toast.error('An error occurred while creating the employee');
    }
  };

  // Function to validate current step
  const validateCurrentStep = async () => {
    const fieldsToValidate = stepValidation[currentStep as keyof StepValidation];
    if (fieldsToValidate.length === 0) return true; // Skip validation for optional steps

    const result = await trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    } else {
      // Show error toast for invalid fields
      const fieldsToValidate = stepValidation[currentStep as keyof StepValidation];
      const invalidFields = fieldsToValidate.filter((field) => errors[field]);
      toast.error(`Please fill in all required fields: ${invalidFields.join(', ')}`);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Handlers to open dialogs after dropdown closes
  const openAddSkillDialog = () => setTimeout(() => setIsAddingSkill(true), 0);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm text-gray-700 mb-1">First Name</Label>
              <Input
                {...register('first_name')}
                type="text"
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
              />
              {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
            </div>
            <div>
              <Label className="block text-sm text-gray-700 mb-1">Middle Name</Label>
              <Input
                {...register('middle_name')}
                type="text"
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
              />
            </div>
            <div>
              <Label className="block text-sm text-gray-700 mb-1">Last Name</Label>
              <Input
                {...register('last_name')}
                type="text"
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
              />
              {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
            </div>
            <div>
              <Label className="block text-sm text-gray-700 mb-1">Suffix</Label>
              <Input
                {...register('suffix')}
                type="text"
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
              />
            </div>
            <div>
              <Label className="block text-sm text-gray-700 mb-1">Email Address</Label>
              <Input
                {...register('email')}
                type="email"
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label className="block text-sm text-gray-700 mb-1">Phone No.</Label>
              <Input
                {...register('phone_number')}
                type="tel"
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
              />
              {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number.message}</p>}
            </div>
            <div>
              <Label className="block text-sm text-gray-700 mb-1">Gender</Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="rounded-xl w-full px-4 py-5 border border-gray-300 hover:border-orange-500">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
            </div>
            <div>
              <Label className="block text-sm text-gray-700 mb-1">Date of Birth</Label>
              <Input
                {...register('birthdate')}
                type="date"
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
              />
              {errors.birthdate && <p className="text-red-500 text-xs mt-1">{errors.birthdate.message}</p>}
            </div>
            <div>
              <Label className="block text-sm text-gray-700 mb-1">Civil Status</Label>
              <Controller
                name="civil_status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="rounded-xl w-full px-4 py-5 border border-gray-300 hover:border-orange-500">
                      <SelectValue placeholder="Select Civil Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="separated">Separated</SelectItem>
                      <SelectItem value="anulled">Anulled</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.civil_status && <p className="text-red-500 text-xs mt-1">{errors.civil_status.message}</p>}
            </div>
            <div>
              <Label className="block text-sm text-gray-700 mb-1">Nationality</Label>
              <Input
                {...register('nationality')}
                type="text"
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
              />
              {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality.message}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="">
            <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-3">
              <PSGCSelect
                initialRegion={control._formValues.region || ''}
                initialProvince={control._formValues.province || ''}
                initialCity={control._formValues.city_or_municipality || ''}
                initialBarangay={control._formValues.barangay || ''}
                onRegionChange={(value) => setValue('region', value)}
                onProvinceChange={(value) => setValue('province', value)}
                onCityChange={(value) => setValue('city_or_municipality', value)}
                onBarangayChange={(value) => setValue('barangay', value)}
              />
              <div className="p-5 mt-[-20px]">
                <Label className="block text-sm font-medium text-gray-700">
                  Street Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register('street')}
                  type="text"
                  placeholder="Enter street address"
                  className={cn(
                    'border rounded-md px-4 py-2.5 text-sm w-full transition-colors mt-1',
                    'hover:border-orange-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500',
                    errors.street ? 'border-red-500' : 'border-gray-300',
                  )}
                />
                {errors.street && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.street.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="">
            <div className="bg-white rounded-xl">
              <p className="text-sm text-gray-500 mb-6">
                Please provide at least one emergency contact. The second contact is optional but recommended for added
                security.
              </p>
              <div className="space-y-8">
                {/* Contact 1 */}
                <div>
                  <div className="mb-2 text-sm font-medium text-gray-700">Contact 1</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">Name</Label>
                      <div className="relative">
                        <Input
                          {...register('emergency_contact1_name')}
                          type="text"
                          placeholder="e.g. Juan Dela Cruz"
                          className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500 pr-8"
                        />
                        {/* Green checkmark if valid */}
                        {form.watch('emergency_contact1_name') && !errors.emergency_contact1_name && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">✔️</span>
                        )}
                      </div>
                      {errors.emergency_contact1_name && (
                        <p className="text-red-500 text-xs mt-1">{errors.emergency_contact1_name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">Relationship</Label>
                      <div className="relative">
                        <Input
                          {...register('emergency_contact1_relationship')}
                          type="text"
                          placeholder="e.g. Mother"
                          className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500 pr-8"
                        />
                        {form.watch('emergency_contact1_relationship') && !errors.emergency_contact1_relationship && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">✔️</span>
                        )}
                      </div>
                      {errors.emergency_contact1_relationship && (
                        <p className="text-red-500 text-xs mt-1">{errors.emergency_contact1_relationship.message}</p>
                      )}
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700">Phone Number</Label>
                      <div className="relative">
                        <Input
                          {...register('emergency_contact1_phone_number')}
                          type="tel"
                          inputMode="tel"
                          placeholder="e.g. 09171234567"
                          className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500 pr-8"
                        />
                        {form.watch('emergency_contact1_phone_number') && !errors.emergency_contact1_phone_number && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">✔️</span>
                        )}
                      </div>
                      {errors.emergency_contact1_phone_number && (
                        <p className="text-red-500 text-xs mt-1">{errors.emergency_contact1_phone_number.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                {/* Contact 2 */}
                <div>
                  <div className="mb-2 text-sm font-medium text-gray-500">
                    Contact 2 <span className="text-xs text-gray-400">(Optional)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="block text-sm font-medium text-gray-500">
                        Name <span className="text-xs text-gray-400">(Optional)</span>
                      </Label>
                      <div className="relative">
                        <Input
                          {...register('emergency_contact2_name')}
                          type="text"
                          placeholder="e.g. Maria Santos"
                          className="border border-gray-200 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500 pr-8 bg-gray-50"
                        />
                        {form.watch('emergency_contact2_name') && !errors.emergency_contact2_name && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">✔️</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-500">
                        Relationship <span className="text-xs text-gray-400">(Optional)</span>
                      </Label>
                      <div className="relative">
                        <Input
                          {...register('emergency_contact2_relationship')}
                          type="text"
                          placeholder="e.g. Father"
                          className="border border-gray-200 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500 pr-8 bg-gray-50"
                        />
                        {form.watch('emergency_contact2_relationship') && !errors.emergency_contact2_relationship && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">✔️</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-500">
                        Phone Number <span className="text-xs text-gray-400">(Optional)</span>
                      </Label>
                      <div className="relative">
                        <Input
                          {...register('emergency_contact2_phone_number')}
                          type="tel"
                          inputMode="tel"
                          placeholder="e.g. 09179876543"
                          className="border border-gray-200 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500 pr-8 bg-gray-50"
                        />
                        {form.watch('emergency_contact2_phone_number') && !errors.emergency_contact2_phone_number && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">✔️</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="bg-white rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left column */}
              <div className="space-y-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-700">Date Hired</Label>
                  <Input
                    {...register('date_hired')}
                    type="date"
                    className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm w-full hover:border-orange-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                  {errors.date_hired && <p className="text-red-500 text-xs mt-1">{errors.date_hired.message}</p>}
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700">Employment Type</Label>
                  <Select onValueChange={(value) => setValue('employment_type_id', parseInt(value))}>
                    <SelectTrigger className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm w-full bg-white shadow-sm hover:border-orange-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500">
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white shadow-lg rounded-lg border border-gray-200 max-h-[300px] overflow-y-auto">
                      <SelectItem value="1">Full Time</SelectItem>
                      <SelectItem value="2">Part Time</SelectItem>
                      <SelectItem value="3">Contract</SelectItem>
                      <SelectItem value="4">Intern</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.employment_type_id && (
                    <p className="text-red-500 text-xs mt-1">{errors.employment_type_id.message}</p>
                  )}
                </div>
              </div>
              {/* Right column */}
              <div className="space-y-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-700">Job Position</Label>
                  <Popover open={openJobPosition} onOpenChange={setOpenJobPosition}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full min-w-[220px] justify-between border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white shadow-sm hover:border-orange-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      >
                        {jobPositions.find((job) => job.id === control._formValues.job_position_id)?.title ||
                          'Select job position'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full min-w-[220px] p-0 bg-white shadow-lg rounded-lg border border-gray-200 max-h-[300px] overflow-y-auto">
                      <Command>
                        <CommandInput placeholder="Search job position..." />
                        <CommandEmpty>No job position found.</CommandEmpty>
                        <CommandGroup>
                          {jobPositions.map((job) => (
                            <CommandItem
                              key={job.id}
                              value={job.title}
                              onSelect={() => {
                                setValue('job_position_id', job.id);
                                setOpenJobPosition(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  control._formValues.job_position_id === job.id ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              {job.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {errors.job_position_id && (
                    <p className="text-red-500 text-xs mt-1">{errors.job_position_id.message}</p>
                  )}
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700">Location Assignment</Label>
                  <div className="space-y-3">
                    {/* Country */}
                    <Popover open={openCountry} onOpenChange={setOpenCountry}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full min-w-[220px] justify-between border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white shadow-sm hover:border-orange-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        >
                          {countries.find(
                            (country) => country.id === control._formValues.location_assignment?.country_assign_id,
                          )?.name || 'Select country'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full min-w-[220px] p-0 bg-white shadow-lg rounded-lg border border-gray-200 max-h-[300px] overflow-y-auto">
                        <Command>
                          <CommandInput placeholder="Search country..." />
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {countries.map((country) => (
                              <CommandItem
                                key={country.id}
                                value={country.name}
                                onSelect={() => {
                                  setValue('location_assignment.country_assign_id', country.id);
                                  setOpenCountry(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    control._formValues.location_assignment?.country_assign_id === country.id
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {country.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {/* Office */}
                    <Popover open={openOffice} onOpenChange={setOpenOffice}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full min-w-[220px] justify-between border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white shadow-sm hover:border-orange-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        >
                          {offices.find(
                            (office) => office.id === control._formValues.location_assignment?.office_assign_id,
                          )?.name || 'Select office'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full min-w-[220px] p-0 bg-white shadow-lg rounded-lg border border-gray-200 max-h-[300px] overflow-y-auto">
                        <Command>
                          <CommandInput placeholder="Search office..." />
                          <CommandEmpty>No office found.</CommandEmpty>
                          <CommandGroup>
                            {offices.map((office) => (
                              <CommandItem
                                key={office.id}
                                value={office.name}
                                onSelect={() => {
                                  setValue('location_assignment.office_assign_id', office.id);
                                  setOpenOffice(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    control._formValues.location_assignment?.office_assign_id === office.id
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {office.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {/* Team */}
                    <Popover open={openTeam} onOpenChange={setOpenTeam}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full min-w-[220px] justify-between border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white shadow-sm hover:border-orange-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        >
                          {teams.find((team) => team.id === control._formValues.location_assignment?.team_assign_id)
                            ?.name || 'Select team'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full min-w-[220px] p-0 bg-white shadow-lg rounded-lg border border-gray-200 max-h-[300px] overflow-y-auto">
                        <Command>
                          <CommandInput placeholder="Search team..." />
                          <CommandEmpty>No team found.</CommandEmpty>
                          <CommandGroup>
                            {teams.map((team) => (
                              <CommandItem
                                key={team.id}
                                value={team.name}
                                onSelect={() => {
                                  setValue('location_assignment.team_assign_id', team.id);
                                  setOpenTeam(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    control._formValues.location_assignment?.team_assign_id === team.id
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {team.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {/* Department */}
                    <Popover open={openDepartment} onOpenChange={setOpenDepartment}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full min-w-[220px] justify-between border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white shadow-sm hover:border-orange-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        >
                          {departments.find(
                            (department) =>
                              department.id === control._formValues.location_assignment?.department_assign_id,
                          )?.name || 'Select department'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full min-w-[220px] p-0 bg-white shadow-lg rounded-lg border border-gray-200 max-h-[300px] overflow-y-auto">
                        <Command>
                          <CommandInput placeholder="Search department..." />
                          <CommandEmpty>No department found.</CommandEmpty>
                          <CommandGroup>
                            {departments.map((department) => (
                              <CommandItem
                                key={department.id}
                                value={department.name}
                                onSelect={() => {
                                  setValue('location_assignment.department_assign_id', department.id);
                                  setOpenDepartment(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    control._formValues.location_assignment?.department_assign_id === department.id
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {department.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
            {/* Employee Skills Section */}
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-500 text-xl">🛠️</span>
                <h3 className="text-lg font-semibold">Employee Skills</h3>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="text-sm text-gray-500 mb-2 md:mb-0">Add relevant skills and years of experience.</div>
                <Button
                  className="bg-[#EE7A2A] hover:bg-[#FFA161] text-white flex items-center gap-2"
                  onClick={openAddSkillDialog}
                >
                  <Plus className="h-4 w-4" />
                  Add Skill
                </Button>
              </div>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Skill Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Years of Experience</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {temporarySkills.map((skill) => (
                      <TableRow key={skill.id} className="hover:bg-gray-50">
                        <TableCell>{skill.name}</TableCell>
                        <TableCell className="max-w-xs truncate">{skill.description}</TableCell>
                        <TableCell className="text-center">{skill.years_of_experience}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleSkillRemove(skill.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {temporarySkills.length === 0 && <p className="mt-4 text-sm text-gray-500">No skills added yet.</p>}
              </div>
              <SkillDialog open={isAddingSkill} onOpenChange={setIsAddingSkill} onSkillAdd={handleSkillAdd} />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="sss_number">SSS Number</Label>
              <Input id="sss_number" {...register('sss_number')} placeholder="Enter SSS number" />
              {errors.sss_number && <p className="text-sm text-red-500">{errors.sss_number.message}</p>}
            </div>
            <div>
              <Label htmlFor="philhealth_number">PhilHealth Number</Label>
              <Input id="philhealth_number" {...register('philhealth_number')} placeholder="Enter PhilHealth number" />
              {errors.philhealth_number && <p className="text-sm text-red-500">{errors.philhealth_number.message}</p>}
            </div>
            <div>
              <Label htmlFor="pagibig_number">Pag-IBIG Number</Label>
              <Input id="pagibig_number" {...register('pagibig_number')} placeholder="Enter Pag-IBIG number" />
              {errors.pagibig_number && <p className="text-sm text-red-500">{errors.pagibig_number.message}</p>}
            </div>
            <div>
              <Label htmlFor="tin_number">TIN</Label>
              <Input id="tin_number" {...register('tin_number')} placeholder="Enter TIN" />
              {errors.tin_number && <p className="text-sm text-red-500">{errors.tin_number.message}</p>}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="bg-white rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 mt-1">Upload all required documents for this employee</p>
              <Button
                type="button"
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center gap-2 shadow-sm"
                onClick={() => setIsAddingDocument(true)}
              >
                <Plus className="h-4 w-4" />
                Add Document
              </Button>
            </div>

            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-medium text-gray-700">Document Name</TableHead>
                    <TableHead className="font-medium text-gray-700">Type</TableHead>
                    <TableHead className="font-medium text-gray-700">Expiry Date</TableHead>
                    <TableHead className="font-medium text-gray-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.length > 0 ? (
                    documents.map((doc) => (
                      <TableRow key={doc.id} className="hover:bg-gray-50/50">
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {doc.type}
                          </span>
                        </TableCell>
                        <TableCell>
                          {doc.expiry_date ? (
                            <span className="text-sm text-gray-600">
                              {new Date(doc.expiry_date).toLocaleDateString()}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">No expiry</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            type="button"
                            variant="ghost"
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Delete document"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <div className="bg-gray-50 p-3 rounded-full mb-3">
                            <span className="text-2xl">📄</span>
                          </div>
                          <p className="font-medium text-gray-900">No documents uploaded</p>
                          <p className="text-sm mt-1">Click the Add Document button to upload required documents</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Document Modal */}
            <DocumentModal
              open={isAddingDocument || editingDocument !== null}
              onClose={() => {
                setIsAddingDocument(false);
                setEditingDocument(null);
              }}
              onSave={handleSaveDocument}
              document={editingDocument}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
              open={deletingDocumentId !== null}
              onClose={() => setDeletingDocumentId(null)}
              onConfirm={() => handleConfirmDeleteDocument()}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const handleDeleteDocument = (id: string) => {
    setDeletingDocumentId(id);
  };
  const handleSaveDocument = (doc: Document) => {
    if (editingDocument) {
      setDocuments((prev) => prev.map((d) => (d.id === doc.id ? doc : d)));
    } else {
      setDocuments((prev) => [...prev, { ...doc, id: Math.random().toString() }]);
    }
    setEditingDocument(null);
    setIsAddingDocument(false);
  };
  const handleConfirmDeleteDocument = () => {
    if (deletingDocumentId) {
      setDocuments((prev) => prev.filter((d) => d.id !== deletingDocumentId));
      setDeletingDocumentId(null);
    }
  };

  if (createdEmployeeId) {
    return (
      <div>
        <ActivateAccountForm employee_id={createdEmployeeId} onSuccess={onCancel} onCancel={onCancel} />
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl mb-6 pb-6">
      <h1 className="text-2xl font-semibold mb-8">Create New Employee Record</h1>

      {/* Progress Bar */}
      <div className="mb-12 px-4">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isCompleted = index + 1 < currentStep;
              const isCurrent = index + 1 === currentStep;

              return (
                <div key={step.id} className="flex flex-col items-center group">
                  {/* Step Circle */}
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 shadow-sm',
                      isCompleted && 'bg-gradient-to-br from-orange-500 to-orange-400 text-white scale-110',
                      isCurrent && 'bg-white border-2 border-orange-500 text-orange-500 scale-110 shadow-md',
                      !isCompleted &&
                        !isCurrent &&
                        'bg-gray-50 text-gray-400 border-2 border-gray-200 group-hover:border-gray-300',
                    )}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : <span className="text-xl">{step.icon}</span>}
                  </div>

                  {/* Step Title */}
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        'text-sm font-semibold transition-colors duration-300',
                        isCompleted || isCurrent ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500',
                      )}
                    >
                      {step.title}
                    </span>

                    {/* Step Number */}
                    <span
                      className={cn(
                        'text-xs mt-1 transition-colors duration-300',
                        isCompleted || isCurrent ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500',
                      )}
                    >
                      Step {step.id}
                    </span>
                  </div>

                  {/* Tooltip */}
                  <div
                    className={cn(
                      'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 transition-opacity duration-200 pointer-events-none',
                      'bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap',
                      'group-hover:opacity-100 group-hover:-translate-y-[calc(100%+8px)]',
                    )}
                  >
                    {step.title}
                    <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          if (currentStep !== steps.length) {
            e.preventDefault();
            return;
          }
          handleSubmit(onSubmit)(e);
        }}
        className="space-y-6"
        onKeyDown={(e) => {
          // Prevent Enter from submitting the form unless on last step
          if (e.key === 'Enter' && currentStep !== steps.length) {
            e.preventDefault();
          }
        }}
      >
        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle>
              {steps[currentStep - 1].icon} {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            Previous
          </Button>
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            {currentStep === steps.length ? (
              <Button type="submit" disabled={isPending} className="bg-orange-500 hover:bg-orange-600">
                {isPending ? 'Creating...' : 'Create Employee'}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  nextStep();
                }}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

function DocumentModal({
  open,
  onClose,
  onSave,
  document,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (doc: Document) => void;
  document: Document | null;
}) {
  const [name, setName] = useState(document?.name || '');
  const [type_id, setTypeId] = useState(document?.type_id || '');
  const [typeName, setTypeName] = useState(document?.type || '');
  const [expiry, setExpiry] = useState(document?.expiry_date || '');
  const [file, setFile] = useState<File | undefined>(undefined);
  const { data: documentTypes = [], isLoading, isError } = useDocumentType();
  useEffect(() => {
    setName(document?.name || '');
    setTypeId(document?.type_id || '');
    setTypeName(document?.type || '');
    setExpiry(document?.expiry_date || '');
    setFile(undefined);
  }, [document, open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4">{document ? 'Edit Document' : 'Add Document'}</h3>
        <div className="space-y-4">
          <div>
            <Label>Document Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Type</Label>
            {isLoading ? (
              <div className="text-sm text-gray-500 mt-1">Loading types...</div>
            ) : isError ? (
              <div className="text-sm text-red-500 mt-1">Failed to load types</div>
            ) : (
              <Select
                value={type_id}
                onValueChange={(val) => {
                  setTypeId(val); // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const selected = documentTypes.find((dt: any) => String(dt.id) === val);
                  setTypeName(selected ? selected.name : '');
                }}
              >
                <SelectTrigger className="w-full rounded-xl px-4 py-3 border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm bg-white mt-1">
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent className="bg-white shadow-lg rounded-lg border border-gray-200 max-h-[300px] overflow-y-auto">
                  {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                  {documentTypes.map((dt: any) => (
                    <SelectItem key={dt.id} value={String(dt.id)}>
                      {dt.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div>
            <Label>Expiry Date (optional)</Label>
            <Input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>File</Label>
            <Input type="file" onChange={(e) => setFile(e.target.files?.[0])} className="mt-1" />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-[#2563eb] text-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSave({
                id: document?.id || Math.random().toString(),
                name,
                type: typeName,
                type_id,
                expiry_date: expiry,
                file,
              });
            }}
            disabled={!name || !type_id}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center">
            <span className="text-[#EE7A2A] text-3xl font-lg text-center">Confirm Deletion</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center">
          <p className="text-center">Are you sure you want to delete this document?</p>
        </div>
        <div className="px-5 pt-5 flex justify-center gap-x-6">
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onConfirm();
            }}
            className="bg-[#EE7A2A] text-white w-[10rem]"
          >
            Delete
          </Button>
          <Button
            type="button"
            className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
