import React, { useState } from 'react';
import { TrashIcon, Check, ChevronsUpDown, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateRecord } from '@/hooks/records/use-create-record';
import { toast } from 'sonner';
import { ActivateAccountForm } from './activate-account-form';
import { DocumentUpload } from './document-upload';
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
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from '@/components/ui/table';

const createRecordSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  suffix: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  gender: z.string().min(1, 'Gender is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  civilStatus: z.string().min(1, 'Civil status is required'),

  // Residential Information
  region: z.string().min(1, 'Region is required'),
  province: z.string().min(1, 'Province is required'),
  city: z.string().min(1, 'City/Municipality is required'),
  barangay: z.string().min(1, 'Barangay is required'),
  street: z.string().min(1, 'Street is required'),

  // Emergency Contacts
  emergencyContact1: z.string().min(1, 'Emergency contact 1 is required'),
  emergencyContact2: z.string().optional(),

  // Employment Information
  jobPosition: z.string().min(1, 'Job position is required'),
  country: z.string().optional(),
  office: z.string().optional(),
  team: z.string().optional(),
  department: z.string().optional(),

  // Government Numbers
  sss: z.string().optional(),
  philhealth: z.string().optional(),
  pagibig: z.string().optional(),
  tin: z.string().optional(),

  // Bank Information
  bankName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankAccountType: z.string().optional(),
});

type CreateRecordFormData = z.infer<typeof createRecordSchema>;

const steps = [
  { id: 1, title: 'Personal Information', icon: '👤' },
  { id: 2, title: 'Residential Information', icon: '📍' },
  { id: 3, title: 'Emergency Contacts', icon: '🚨' },
  { id: 4, title: 'Employment Information', icon: '💼' },
  { id: 5, title: 'Government & Bank Information', icon: '📄' },
  { id: 6, title: 'Required Documents', icon: '📎' },
];

type StepValidation = {
  [key in 1 | 2 | 3 | 4 | 5 | 6]: (keyof CreateRecordFormData)[];
};

// Define required fields for each step
const stepValidation: StepValidation = {
  1: ['firstName', 'lastName', 'email', 'phone', 'gender', 'dateOfBirth', 'civilStatus'],
  2: ['region', 'province', 'city', 'barangay', 'street'],
  3: ['emergencyContact1'],
  4: ['jobPosition'], // Only job position is required
  5: [], // Optional fields
  6: [], // Optional fields
};

export const NewEmployeeForm = ({ onCancel }: { onCancel: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [createdEmployeeId, setCreatedEmployeeId] = useState<string | null>(null);
  const [temporaryDocuments, setTemporaryDocuments] = useState<TemporaryDocument[]>([]);
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

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<CreateRecordFormData>({
    resolver: zodResolver(createRecordSchema),
    mode: 'onChange',
  });

  const handleFileSelect = (document: TemporaryDocument) => {
    setTemporaryDocuments((prev) => [...prev, document]);
  };

  const handleDeleteTemporaryDocument = (documentId: string) => {
    setTemporaryDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
  };

  const handleSkillAdd = (skill: TemporarySkill) => {
    setTemporarySkills((prev) => [...prev, skill]);
  };

  const handleSkillRemove = (skillId: string) => {
    setTemporarySkills((prev) => prev.filter((skill) => skill.id !== skillId));
  };

  const onSubmit = async (data: CreateRecordFormData) => {
    try {
      const formData = {
        ...data,
        skills: temporarySkills.map((skill) => ({
          skill_id: parseInt(skill.skill_id),
          years_of_experience: parseFloat(skill.years_of_experience),
        })),
      };

      createRecord(formData, {
        onSuccess: (response) => {
          setCreatedEmployeeId(response.employeeId);
          toast.success('Employee record created successfully');
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to create employee record');
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('An unexpected error occurred');
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm text-gray-700 mb-1">First Name</Label>
              <Input
                {...register('firstName')}
                type="text"
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <Label className="block text-sm text-gray-700 mb-1">Middle Name</Label>
              <Input
                {...register('middleName')}
                type="text"
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
              />
            </div>
            <div>
              <Label className="block text-sm text-gray-700 mb-1">Last Name</Label>
              <Input
                {...register('lastName')}
                type="text"
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
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
                {...register('phone')}
                type="tel"
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
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
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
            </div>
            <div>
              <Label className="block text-sm text-gray-700 mb-1">Date of Birth</Label>
              <Input
                {...register('dateOfBirth')}
                type="date"
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
              />
              {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}
            </div>
            <div>
              <Label className="block text-sm text-gray-700 mb-1">Civil Status</Label>
              <Controller
                name="civilStatus"
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
                      <SelectItem value="separated">Separated</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.civilStatus && <p className="text-red-500 text-xs mt-1">{errors.civilStatus.message}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 gap-4">
            <PSGCSelect
              onRegionChange={(value) => {
                setValue('region', value);
                setValue('province', '');
                setValue('city', '');
                setValue('barangay', '');
              }}
              onProvinceChange={(value) => {
                setValue('province', value);
                setValue('city', '');
                setValue('barangay', '');
              }}
              onCityChange={(value) => {
                setValue('city', value);
                setValue('barangay', '');
              }}
              onBarangayChange={(value) => setValue('barangay', value)}
            />
            <div>
              <Label className="block text-sm text-gray-700 mb-1">Street</Label>
              <Input
                {...register('street')}
                type="text"
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
              />
              {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm text-gray-700 mb-1">Emergency Contact 1</Label>
              <Input
                {...register('emergencyContact1')}
                type="text"
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
              />
              {errors.emergencyContact1 && (
                <p className="text-red-500 text-xs mt-1">{errors.emergencyContact1.message}</p>
              )}
            </div>
            <div>
              <Label className="block text-sm text-gray-700 mb-1">Emergency Contact 2</Label>
              <Input
                {...register('emergencyContact2')}
                type="text"
                className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="block text-sm text-gray-700 mb-1">Job Position</Label>
                <Controller
                  name="jobPosition"
                  control={control}
                  render={({ field }) => (
                    <Popover open={openJobPosition} onOpenChange={setOpenJobPosition}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openJobPosition}
                          className="w-full justify-between rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500"
                        >
                          {field.value
                            ? jobPositions.find((position) => position.id.toString() === field.value)?.title
                            : 'Select job position...'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search job position..." />
                          <CommandEmpty>No job position found.</CommandEmpty>
                          <CommandGroup>
                            {jobPositions.map((position) => (
                              <CommandItem
                                key={position.id}
                                value={position.title}
                                onSelect={() => {
                                  field.onChange(position.id.toString());
                                  setOpenJobPosition(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    field.value === position.id.toString() ? 'opacity-100' : 'opacity-0',
                                  )}
                                />
                                {position.title}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.jobPosition && <p className="text-red-500 text-xs mt-1">{errors.jobPosition.message}</p>}
              </div>

              <div>
                <Label className="block text-sm text-gray-700 mb-1">Country</Label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Popover open={openCountry} onOpenChange={setOpenCountry}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCountry}
                          className="w-full justify-between rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500"
                        >
                          {field.value
                            ? countries.find((country) => country.id.toString() === field.value)?.name
                            : 'Select country...'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search country..." />
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {countries.map((country) => (
                              <CommandItem
                                key={country.id}
                                value={country.name}
                                onSelect={() => {
                                  field.onChange(country.id.toString());
                                  setOpenCountry(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    field.value === country.id.toString() ? 'opacity-100' : 'opacity-0',
                                  )}
                                />
                                {country.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
              </div>

              <div>
                <Label className="block text-sm text-gray-700 mb-1">Office</Label>
                <Controller
                  name="office"
                  control={control}
                  render={({ field }) => (
                    <Popover open={openOffice} onOpenChange={setOpenOffice}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openOffice}
                          className="w-full justify-between rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500"
                        >
                          {field.value
                            ? offices.find((office) => office.id.toString() === field.value)?.name
                            : 'Select office...'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search office..." />
                          <CommandEmpty>No office found.</CommandEmpty>
                          <CommandGroup>
                            {offices.map((office) => (
                              <CommandItem
                                key={office.id}
                                value={office.name}
                                onSelect={() => {
                                  field.onChange(office.id.toString());
                                  setOpenOffice(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    field.value === office.id.toString() ? 'opacity-100' : 'opacity-0',
                                  )}
                                />
                                {office.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.office && <p className="text-red-500 text-xs mt-1">{errors.office.message}</p>}
              </div>

              <div>
                <Label className="block text-sm text-gray-700 mb-1">Team</Label>
                <Controller
                  name="team"
                  control={control}
                  render={({ field }) => (
                    <Popover open={openTeam} onOpenChange={setOpenTeam}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openTeam}
                          className="w-full justify-between rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500"
                        >
                          {field.value
                            ? teams.find((team) => team.id.toString() === field.value)?.name
                            : 'Select team...'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search team..." />
                          <CommandEmpty>No team found.</CommandEmpty>
                          <CommandGroup>
                            {teams.map((team) => (
                              <CommandItem
                                key={team.id}
                                value={team.name}
                                onSelect={() => {
                                  field.onChange(team.id.toString());
                                  setOpenTeam(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    field.value === team.id.toString() ? 'opacity-100' : 'opacity-0',
                                  )}
                                />
                                {team.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.team && <p className="text-red-500 text-xs mt-1">{errors.team.message}</p>}
              </div>

              <div>
                <Label className="block text-sm text-gray-700 mb-1">Department</Label>
                <Controller
                  name="department"
                  control={control}
                  render={({ field }) => (
                    <Popover open={openDepartment} onOpenChange={setOpenDepartment}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openDepartment}
                          className="w-full justify-between rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500"
                        >
                          {field.value
                            ? departments.find((department) => department.id.toString() === field.value)?.name
                            : 'Select department...'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search department..." />
                          <CommandEmpty>No department found.</CommandEmpty>
                          <CommandGroup>
                            {departments.map((department) => (
                              <CommandItem
                                key={department.id}
                                value={department.name}
                                onSelect={() => {
                                  field.onChange(department.id.toString());
                                  setOpenDepartment(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    field.value === department.id.toString() ? 'opacity-100' : 'opacity-0',
                                  )}
                                />
                                {department.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>}
              </div>
            </div>

            {/* Skills Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Employee Skills</h3>
                <Button className="bg-[#EE7A2A] hover:bg-[#FFA161] text-white" onClick={() => setIsAddingSkill(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              </div>

              {temporarySkills.length > 0 ? (
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
                            <button
                              onClick={() => handleSkillRemove(skill.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No skills added yet.</p>
              )}
            </div>

            {/* Add Skill Dialog */}
            <SkillDialog open={isAddingSkill} onOpenChange={setIsAddingSkill} onSkillAdd={handleSkillAdd} />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm text-gray-700 mb-1">SSS Number</Label>
                <Input
                  {...register('sss')}
                  type="text"
                  className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
                />
              </div>
              <div>
                <Label className="block text-sm text-gray-700 mb-1">PhilHealth Number</Label>
                <Input
                  {...register('philhealth')}
                  type="text"
                  className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
                />
              </div>
              <div>
                <Label className="block text-sm text-gray-700 mb-1">Pag-IBIG Number</Label>
                <Input
                  {...register('pagibig')}
                  type="text"
                  className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
                />
              </div>
              <div>
                <Label className="block text-sm text-gray-700 mb-1">TIN</Label>
                <Input
                  {...register('tin')}
                  type="text"
                  className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
                />
              </div>
              <div>
                <Label className="block text-sm text-gray-700 mb-1">Bank Account Number</Label>
                <Input
                  {...register('bankAccountNumber')}
                  type="text"
                  className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <Label className="block text-sm text-gray-700 mb-4">Required Documents</Label>
              <p className="text-sm text-gray-500 mb-4">
                Please upload all required documents for the employee record.
              </p>
              <div className="space-y-4">
                <DocumentUpload onFileSelect={handleFileSelect} />
                {temporaryDocuments.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {temporaryDocuments.map((document) => (
                      <div key={document.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{document.name}</p>
                          <p className="text-sm text-gray-500">{document.documentType}</p>
                          {document.expiryDate && (
                            <p className="text-sm text-gray-500">Expires: {document.expiryDate}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteTemporaryDocument(document.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (createdEmployeeId) {
    return (
      <div>
        <ActivateAccountForm
          employeeId={createdEmployeeId}
          onSuccess={onCancel}
          onCancel={() => setCreatedEmployeeId(null)}
        />
        <div className="mt-4">
          <DocumentUpload onFileSelect={handleFileSelect} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl mb-6 pb-6">
      <h1 className="text-2xl font-semibold mb-8">Create New Employee Record</h1>

      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        <div className="flex justify-between mt-2">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col items-center ${step.id <= currentStep ? 'text-orange-500' : 'text-gray-400'}`}
            >
              <span className="text-xl mb-1">{step.icon}</span>
              <span className="text-sm">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <Button type="button" onClick={nextStep} className="bg-orange-500 hover:bg-orange-600">
                Next
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
