'use client';

import { Mail, Phone, FilePenLine, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function Page() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="lg:hidden md:block sm:block ml-20 mb-0 mt-4 text-3xl text-[#EE7A2A] font-bold">
        Employee Profile
      </h1>
      <Card className="h-fit m-5 mb-2 bg-white shadow-md">
        <CardHeader>
          <div className="flex flex-row items-start w-full">
            <div className="hidden sm:inline">
              <Avatar className="pl-[25%] h-auto w-[10rem] content-center pr-6">
                <AvatarImage src="/Superadmin.png" />
              </Avatar>
            </div>
            <div>
              <div>
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-2xl text-[#EE7A2A]">User Name</CardTitle>
                  <span className="text-sm text-gray-600">( Role )</span>
                </div>
              </div>

              <CardDescription>
                <div className="flex flex-row pt-3">
                  <div className="pr-6 pb-3">
                    <Mail size={18} strokeWidth={1.5} />
                  </div>
                  <div className="text-xs">Email</div>
                </div>
                <div className="flex flex-row">
                  <div className="pr-6">
                    <Phone size={18} strokeWidth={1.5} />
                  </div>
                  <div className="text-xs">Phone</div>
                </div>
              </CardDescription>
            </div>
            {/* Modal Trigger */}
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
                    <input
                      type="password"
                      className="mt-1 p-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Enter old password"
                    />
                  </div>

                  {/* New Password */}
                  <div className="mb-4">
                    <label>
                      <h3 className="text-gray-600">New Password</h3>
                    </label>
                    <input
                      type="password"
                      className="mt-1 p-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Enter new password"
                    />
                  </div>

                  {/* Confirm New Password */}
                  <div className="mb-4">
                    <label>
                      <h3 className="text-gray-600">Confirm New Password</h3>
                    </label>
                    <input
                      type="password"
                      className="mt-1 p-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Confirm new password"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="col-span-3 px-5 pt-5 flex justify-center gap-x-6">
                    <Button className="bg-[#EE7A2A] text-white w-[10rem]">Change Password</Button>
                    <Button className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]">Cancel</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      <Card className="h-fit m-5 bg-white shadow-md">
        <CardHeader className="text-xl">
          <div className="flex justify-between">
            <div className="order-1">
              <CardTitle>Personal Information</CardTitle>
            </div>

            {/* Modal Trigger */}
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
                  <form action="" method="post">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      <div className="flex flex-col p-5">
                        <div>
                          <label>
                            <h3 className="text-gray-600">First Name</h3>
                          </label>
                        </div>
                        <div>
                          <input
                            type="text"
                            className="mt-1 p-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter first name"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col p-5">
                        <label>
                          <h3 className="text-gray-600">Middle Name</h3>
                        </label>
                        <div>
                          <input
                            type="text"
                            className="mt-1 p-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter middle name"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col p-5">
                        <label>
                          <h3 className="text-gray-600">Last Name</h3>
                        </label>
                        <div>
                          <input
                            type="text"
                            className="mt-1 p-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter last name"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col p-5">
                        <label>
                          <h3 className="text-gray-600">Suffix</h3>
                        </label>
                        <div>
                          <input
                            type="text"
                            className="mt-1 p-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter Suffix"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col p-5">
                        <label>
                          <h3 className="text-gray-600">Email Adress</h3>
                        </label>
                        <div>
                          <input
                            type="text"
                            className="mt-1 p-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter email address"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col p-5">
                        <label>
                          <h3 className="text-gray-600">Phone no.</h3>
                        </label>
                        <div>
                          <input
                            type="text"
                            className="mt-1 p-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter phone no."
                          />
                        </div>
                      </div>
                      <div className="flex flex-col p-5">
                        <label>
                          <h3 className="text-gray-600">Gender</h3>
                        </label>
                        <div>
                          <input
                            type="text"
                            className="mt-1 p-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter gender"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col p-5">
                        <label>
                          <h3 className="text-gray-600">Date of Birth</h3>
                        </label>
                        <div>
                          <input
                            type="text"
                            className="mt-1 p-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter date of birth"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col p-5">
                        <label>
                          <h3 className="text-gray-600">Role</h3>
                        </label>
                        <div>
                          <input
                            type="text"
                            className="mt-1 p-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter role"
                          />
                        </div>
                      </div>
                      <div className="col-span-1 md:col-span-2 lg:col-span-3 px-5 pt-5 flex justify-center gap-x-6">
                        <Button className="bg-[#EE7A2A] text-white w-[10rem]">Save Changes</Button>
                        <Button className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]">Cancel</Button>
                      </div>
                    </div>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">First Name</h3>
              </div>
              <div className="font-medium">First Name</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Middle Name</h3>
              </div>
              <div className="font-medium">Middle Name</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Last Name</h3>
              </div>
              <div className="font-medium">Last Name</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Suffix</h3>
              </div>
              <div className="font-medium">Suffix</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Email Address</h3>
              </div>
              <div className="font-medium">Email Address</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Phone No.</h3>
              </div>
              <div className="font-medium">Phone No.</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Gender</h3>
              </div>
              <div className="font-medium">Gender</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Date of Birth</h3>
              </div>
              <div className="font-medium">Date of Birth</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Role</h3>
              </div>
              <div className="font-medium">Role</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="h-fit m-5 bg-white shadow-md">
        <CardHeader className="text-xl">
          <div className="flex justify-between">
            <div className="order-1">
              <CardTitle>Residential Information</CardTitle>
            </div>

            {/* Modal Trigger */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="order-2">
                  <FilePenLine size={22} strokeWidth={2} className="text-[#EE7A2A]" />
                </button>
              </DialogTrigger>
              <DialogContent className="w-full lg:max-w-[60rem] lg:!max-w-[60rem] lg:h-fit md:h-auto sm:h-[90vh] h-[90vh] flex flex-col">
                <DialogHeader className="shrink-0 pb-4">
                  <DialogTitle>Edit Residential Information</DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto lg:flex-0 lg:px-0 md:overflow-y-auto md:flex-1 md:px-5 sm:overflow-y-auto sm:flex-1 sm:px-5">
                  <form action="" method="post">
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      <div className="flex flex-col p-5">
                        <div>
                          <label>
                            <h3 className="text-gray-600">Region</h3>
                          </label>
                        </div>
                        <div>
                          <input
                            type="text"
                            className="mt-1 p-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter region"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col p-5">
                        <label>
                          <h3 className="text-gray-600">Province</h3>
                        </label>
                        <div>
                          <input
                            type="text"
                            className="mt-1 p-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter province"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col p-5">
                        <label>
                          <h3 className="text-gray-600">City/Municipality</h3>
                        </label>
                        <div>
                          <input
                            type="text"
                            className="mt-1 p-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter last name"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col p-5">
                        <label>
                          <h3 className="text-gray-600">Barangay</h3>
                        </label>
                        <div>
                          <input
                            type="text"
                            className="mt-1 p-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter barangay"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col p-5">
                        <label>
                          <h3 className="text-gray-600">Street</h3>
                        </label>
                        <div>
                          <input
                            type="text"
                            className="mt-1 p-1 pl-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter street"
                          />
                        </div>
                      </div>
                      <div className="col-span-1 md:col-span-2 lg:col-span-3 px-5 pt-5 flex justify-center gap-x-6">
                        <Button className="bg-[#EE7A2A] text-white w-[10rem]">Save Changes</Button>
                        <Button className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]">Cancel</Button>
                      </div>
                    </div>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Region</h3>
              </div>
              <div className="font-medium">Region 7</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Province</h3>
              </div>
              <div className="font-medium">Cebu</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">City/Municipality</h3>
              </div>
              <div className="font-medium">Cebu City</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Barangay</h3>
              </div>
              <div className="font-medium">Jaclupan</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Street</h3>
              </div>
              <div className="font-medium">Purok Sambag</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
