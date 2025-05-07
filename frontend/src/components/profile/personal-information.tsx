import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import EditPersonalInformation from './edit-personal-information';
export default function PersonalInformation() {
  const authContext = useContext(AuthContext);

  return (
    <Card className="h-fit m-5 bg-white shadow-md">
      <CardHeader className="text-xl">
        <div className="flex justify-between">
          <div className="order-1">
            <CardTitle>Personal Information</CardTitle>
          </div>

          {/* Modal Trigger */}
          <EditPersonalInformation />
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3">
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">First Name</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.first_name}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Middle Name</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.middle_name || 'N/A'}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Last Name</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.last_name}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Suffix</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.suffix || 'N/A'}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Email Address</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.email}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Phone No.</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.phone_number}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Emergency Contact 1</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.emergency_contact1}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Emergency Contact 2</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.emergency_contact2}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Gender</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.gender}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Date of Birth</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.birthdate}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Age</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.age}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Civil Status</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.civil_status}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Nationality</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.nationality}`}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
