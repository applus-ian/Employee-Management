// 'use client';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { DialogHeader, DialogContent, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { useCountryAssign } from '@/hooks/settings/job-position/country-assign/use-fetch-country-assigns';
// import { useOfficeAssign } from '@/hooks/settings/job-position/office-assign/use-fetch-office-assigns';
// import { useTeamAssign } from '@/hooks/settings/job-position/team-assign/use-fetch-team-assigns';
// import { useDepartmentAssign } from '@/hooks/settings/job-position/department-assign/use-fetch-department-assigns';
// import { useCreateLocationAssignment } from '@/hooks/settings/job-position/location-assignment/use-create-location-assignment';
// import { useRecords } from '@/hooks/records/use-fetch-records';
// import { createLocationAssignmentInput, CreateLocationAssignment } from '@/schemas';
// import toast from 'react-hot-toast';

// interface NewLocationAssignmentFormProps {
//   onCancel: () => void;
//   onSave: (data: CreateLocationAssignment) => void;
// }

// export default function NewLocationAssignmentForm({ onCancel, onSave }: NewLocationAssignmentFormProps) {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<CreateLocationAssignment>({
//     resolver: zodResolver(createLocationAssignmentInput),
//     defaultValues: {
//       country_assign_id: undefined as unknown as number,
//       office_assign_id: undefined as unknown as number,
//       team_assign_id: undefined as unknown as number,
//       department_assign_id: undefined as unknown as number,
//       employee_id: '',
//     },
//   });

//   const { data: countries = [], isLoading: countryLoading } = useCountryAssign();
//   const { data: offices = [], isLoading: officeLoading } = useOfficeAssign();
//   const { data: teams = [], isLoading: teamLoading } = useTeamAssign();
//   const { data: departments = [], isLoading: deptLoading } = useDepartmentAssign();
//   const { data, isLoading } = useRecords();
//   const { mutate: createLocationAssignment, isPending, isError, error } = useCreateLocationAssignment();

//   const onSubmit = (data: CreateLocationAssignment) => {
//     console.log('Form data:', data);
//     alert('Form submitted!');
//   };
//   const onError = (errors: any) => {
//     console.log("❌ Validation errors:", errors);
//   };

//   return (
//     <DialogContent className="flex h-fit w-full flex-col bg-white lg:!max-w-[45rem]">
//       <DialogHeader>
//         <DialogTitle>Create New Location Assignment</DialogTitle>
//       </DialogHeader>
//       <DialogDescription> </DialogDescription>

//       <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5 px-5 py-3">
//         <div>
//           <Label htmlFor="employee_id" className="text-black">
//             Employee
//           </Label>
//           <select
//             id="employee_id"
//             className="mt-2 w-full rounded-md border px-2 py-1 text-sm"
//             {...register('employee_id', { required: true })} // <-- FIXED HERE
//             disabled={isLoading}
//           >
//             <option value="">Select Employee</option>
//             {data?.records.users.map((user) => (
//               <option key={user.employee.id} value={user.employee.id}>
//                 {user.employee.first_name} {user.employee.last_name} - {user.employee.job_position.title}
//               </option>
//             ))}
//           </select>
//           {errors.employee_id && <p className="text-sm text-red-500">{errors.employee_id.message}</p>}
//         </div>

//         <div>
//           <Label htmlFor="country_assign_id" className="text-black">
//             Country Assign
//           </Label>
//           <select
//             id="country_assign_id"
//             className="mt-2 w-full rounded-md border px-2 py-1 text-sm"
//             {...register('country_assign_id')}
//             disabled={countryLoading}
//           >
//             <option value="">Select Country Assign</option>
//             {countries.map((country) => (
//               <option key={country.id} value={country.id}>
//                 {country.name}
//               </option>
//             ))}
//           </select>
//           {errors.country_assign_id && <p className="text-sm text-red-500">{errors.country_assign_id.message}</p>}
//         </div>

//         <div>
//           <Label htmlFor="office_assign_id" className="text-black">
//             Office Assign
//           </Label>
//           <select
//             id="office_assign_id"
//             className="mt-2 w-full rounded-md border px-2 py-1 text-sm"
//             {...register('office_assign_id')}
//             disabled={officeLoading}
//           >
//             <option value="">Select Office Assign</option>
//             {offices.map((office) => (
//               <option key={office.id} value={office.id}>
//                 {office.name}
//               </option>
//             ))}
//           </select>
//           {errors.office_assign_id && <p className="text-sm text-red-500">{errors.office_assign_id.message}</p>}
//         </div>

//         <div>
//           <Label htmlFor="team_assign_id" className="text-black">
//             Team Assign
//           </Label>
//           <select
//             id="team_assign_id"
//             className="mt-2 w-full rounded-md border px-2 py-1 text-sm"
//             {...register('team_assign_id')}
//             disabled={teamLoading}
//           >
//             <option value="">Select Team Assign</option>
//             {teams.map((team) => (
//               <option key={team.id} value={team.id}>
//                 {team.name}
//               </option>
//             ))}
//           </select>
//           {errors.team_assign_id && <p className="text-sm text-red-500">{errors.team_assign_id.message}</p>}
//         </div>

//         <div>
//           <Label htmlFor="department_assign_id" className="text-black">
//             Department Assign
//           </Label>
//           <select
//             id="department_assign_id"
//             className="mt-2 w-full rounded-md border px-2 py-1 text-sm"
//             {...register('department_assign_id')}
//             disabled={deptLoading}
//           >
//             <option value="">Select Department Assign</option>
//             {departments.map((dept) => (
//               <option key={dept.id} value={dept.id}>
//                 {dept.name}
//               </option>
//             ))}
//           </select>
//           {errors.department_assign_id && <p className="text-sm text-red-500">{errors.department_assign_id.message}</p>}
//         </div>

//         {isError && (
//           <div className="text-red-600">
//             <p>Error creating location assignment: {error?.message}</p>
//           </div>
//         )}

//         {/* Actions ---------------------------------------------------------*/}
//         <div className="flex justify-center gap-x-6 pt-3">
//           <Button type="submit" className="w-[10rem] bg-[#EE7A2A] text-white" disabled={isPending}>
//             {isPending ? 'Creating...' : 'Create'}
//           </Button>
//           <DialogClose asChild>
//             <Button
//               type="button"
//               className="w-[10rem] border-2 border-[#EE7A2A] bg-white text-[#EE7A2A]"
//               onClick={onCancel}
//               disabled={isPending}
//             >
//               Cancel
//             </Button>
//           </DialogClose>
//         </div>
//       </form>
//     </DialogContent>
//   );
// }
