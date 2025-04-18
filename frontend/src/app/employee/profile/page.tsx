'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { Mail, Phone, FilePenLine } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '19rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <div className="flex flex-col w-full lg:pl-[16rem]">
        <Card className="h-fit m-5 mb-2 bg-white shadow-md">
          <CardHeader>
            <div className="flex flex-row ">
              <div>
                <Avatar className="pl-[25%] w-[75%] h-auto content-center">
                  <AvatarImage src="/Superadmin.png" />
                </Avatar>
              </div>
              <div>
                <div className="flex flex-row content-center">
                  <CardTitle className="text-2xl text-[#EE7A2A] pb-3 pr-5">User Name</CardTitle>
                  <span className="text-sm text-gray-600 pb-3 content-center">( Role )</span>
                  {/* <Button className="flex justify-end bg-[#EE7A2A]">Change Password </Button> */}
                </div>

                <CardDescription>
                  <div className="flex flex-row">
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
            </div>
          </CardHeader>
        </Card>

        <Card className="h-fit m-5 bg-white shadow-md">
          <CardHeader className="text-xl">
            <div className="flex justify-between">
              <div className="order-1">
                <CardTitle>Personal Information</CardTitle>
              </div>
              <Button className="order-2">
                <FilePenLine size={22} strokeWidth={2} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3">
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
              <button className="order-2">
                <FilePenLine size={22} strokeWidth={2} />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3">
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
    </SidebarProvider>
  );
}
