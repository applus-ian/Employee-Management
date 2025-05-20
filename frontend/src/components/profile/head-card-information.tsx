'use client';

import { useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, Briefcase, Users, UserCheck } from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';
// import { updatePasswordSchema, UpdatePasswordInput } from '@/schemas';
// import { useUpdatePassword } from '@/hooks/profile/use-update-password';

export default function HeadCardInformation() {
  const { user } = useContext(AuthContext);
  const roleNames = user?.roles.map((role) => role.name).join(', ') || 'No roles assigned';

  // const {
  //   // register,
  //   // handleSubmit,
  //   // reset,
  //   formState: { errors },
  // } = useForm<UpdatePasswordInput>({
  //   resolver: zodResolver(updatePasswordSchema),
  // });

  // const updatePassword = useUpdatePassword();

  // const onSubmit = (data: UpdatePasswordInput) => {
  //   updatePassword.mutate(data, {
  //     onSuccess: () => {
  //       reset();
  //       alert('Password updated successfully!');
  //     },
  //     onError: (error: unknown) => {
  //       if (axios.isAxiosError(error)) {
  //         // Handle AxiosError
  //         alert(error.response?.data?.message || 'Password update failed');
  //       } else if (error instanceof Error) {
  //         // Handle general JavaScript Error
  //         alert(error.message || 'Password update failed');
  //       } else {
  //         // Handle unknown error types
  //         alert('Password update failed');
  //       }
  //     },
  //   });
  // };

  return (
    <>
      <Card className="h-fit m-5 bg-white shadow-md">
        <CardHeader>
          <div className="flex flex-row items-start w-full">
            <div className="hidden sm:inline">
              <Avatar className="pl-[25%] h-auto w-[10rem] content-center pr-6">
                <AvatarImage src="/Superadmin.png" />
              </Avatar>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <CardTitle className="text-2xl text-[#EE7A2A]">
                  {`${user?.employee?.first_name || ''} ${user?.employee?.middle_name || ''} ${user?.employee?.last_name || ''}`}
                </CardTitle>
                <span className="text-sm text-gray-600">({roleNames})</span>
              </div>

              <CardDescription className="pt-3 space-y-2 text-xs">
                <div className="flex items-center">
                  <Mail size={18} strokeWidth={1.5} className="mr-3 text-muted-foreground" />
                  {user?.email}
                </div>
                <div className="flex items-center">
                  <Phone size={18} strokeWidth={1.5} className="mr-3 text-muted-foreground" />
                  {user?.employee?.phone_number}
                </div>
                <div className="flex items-center">
                  <Briefcase size={18} strokeWidth={1.5} className="mr-3 text-muted-foreground" />
                  {user?.employee?.job_position?.title || 'No job position'}
                </div>
                {user?.employee?.manager && (
                  <div className="flex items-center">
                    <UserCheck size={18} strokeWidth={1.5} className="mr-3 text-muted-foreground" />
                    Manager: {user.employee.manager.full_name}
                  </div>
                )}
                <div className="flex items-center">
                  <Users size={18} strokeWidth={1.5} className="mr-3 text-muted-foreground" />
                  {user?.employee?.employment_type?.name || 'No employment type'}
                </div>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}
