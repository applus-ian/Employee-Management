import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import { Mail, Phone, Briefcase, Users, UserCheck, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '../ui/input';

export default function HeadCardInformation() {
  const authContext = useContext(AuthContext);
  const roleNames = authContext.user?.roles.map((role) => role.name).join(', ');

  return (
    <Card className="h-fit m-5 mb-2 bg-white shadow-md">
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
                {`${authContext.user?.employee?.first_name} 
                ${authContext.user?.employee?.middle_name || ''} 
                ${authContext.user?.employee?.last_name}`}
              </CardTitle>
              <span className="text-sm text-gray-600">( {roleNames || 'No roles assigned'} )</span>
            </div>

            <CardDescription className="pt-3 space-y-2">
              {/* Email */}
              <div className="flex items-center text-xs">
                <Mail size={18} strokeWidth={1.5} className="mr-3 text-muted-foreground" />
                {authContext.user?.email}
              </div>

              {/* Phone */}
              <div className="flex items-center text-xs">
                <Phone size={18} strokeWidth={1.5} className="mr-3 text-muted-foreground" />
                {authContext.user?.employee?.phone_number}
              </div>

              {/* Job Position */}
              <div className="flex items-center text-xs">
                <Briefcase size={18} strokeWidth={1.5} className="mr-3 text-muted-foreground" />
                {authContext.user?.employee?.job_position?.title || 'No job position'}
              </div>

              {/* Manager (conditionally render) */}
              {authContext.user?.employee?.manager && (
                <div className="flex items-center text-xs">
                  <UserCheck size={18} strokeWidth={1.5} className="mr-3 text-muted-foreground" />
                  Manager: {`${authContext.user?.employee.manager?.full_name}`}
                </div>
              )}

              {/* Employment Type */}
              <div className="flex items-center text-xs">
                <Users size={18} strokeWidth={1.5} className="mr-3 text-muted-foreground" />
                {authContext.user?.employee.employment_type?.name || 'No employment type'}
              </div>
            </CardDescription>
          </div>
          {/* Update Password */}
          <Dialog>
            <DialogTrigger asChild>
              <div className="ml-auto">
                <Button className="bg-white text-[#EE7A2A] border-[#EE7A2A] border-2 w-fit flex items-center">
                  <span className="hidden sm:inline">Update Password</span>
                  <KeyRound />
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="pb-5">
                <DialogTitle>Update Password</DialogTitle>
              </DialogHeader>
              <form action="" method="post">
                {/* Old Password */}
                <div className="mb-4">
                  <label>
                    <h3 className="text-gray-600">Old Password</h3>
                  </label>
                  <Input
                    type="password"
                    className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Enter old password"
                  />
                </div>

                {/* New Password */}
                <div className="mb-4">
                  <label>
                    <h3 className="text-gray-600">New Password</h3>
                  </label>
                  <Input
                    type="password"
                    className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Enter new password"
                  />
                </div>

                {/* Confirm New Password */}
                <div className="mb-4">
                  <label>
                    <h3 className="text-gray-600">Confirm New Password</h3>
                  </label>
                  <Input
                    type="password"
                    className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Confirm new password"
                  />
                </div>

                {/* Submit Button */}
                <div className="col-span-3 px-5 pt-5 flex justify-center gap-x-6">
                  <Button className="bg-[#EE7A2A] text-white w-[10rem]">Change Password</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
    </Card>
  );
}
