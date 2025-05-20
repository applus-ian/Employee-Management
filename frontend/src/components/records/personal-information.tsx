import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import EditPersonalInformation from './edit-personal-information';
import { UserSchema } from '@/schemas';

interface Props {
  record?: UserSchema;
}

export function PersonalInformation({ record }: Props) {
  return (
    <>
      <Card className="rounded-xl border shadow-sm ">
        <CardHeader>
          <div className="flex justify-between">
            <div className="order-1">
              <CardTitle>👤 Personal Information</CardTitle>
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
              <div className="font-medium">{`${record?.employee.first_name}`}</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Middle Name</h3>
              </div>
              <div className="font-medium">{`${record?.employee.middle_name || 'N/A'}`}</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Last Name</h3>
              </div>
              <div className="font-medium">{`${record?.employee.last_name}`}</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Suffix</h3>
              </div>
              <div className="font-medium">{`${record?.employee.suffix || 'N/A'}`}</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Email Address</h3>
              </div>
              <div className="font-medium">{`${record?.employee.email}`}</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Phone No.</h3>
              </div>
              <div className="font-medium">{`${record?.employee.phone_number}`}</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Emergency Contact 1</h3>
              </div>
              <div className="font-medium">{`${record?.employee.emergency_contact1}`}</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Emergency Contact 2</h3>
              </div>
              <div className="font-medium">{`${record?.employee.emergency_contact2}`}</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Gender</h3>
              </div>
              <div className="font-medium">{`${record?.employee.gender}`}</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Date of Birth</h3>
              </div>
              <div className="font-medium">{`${record?.employee.birthdate}`}</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Age</h3>
              </div>
              <div className="font-medium">{`${record?.employee.age}`}</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Civil Status</h3>
              </div>
              <div className="font-medium">{`${record?.employee.civil_status}`}</div>
            </div>
            <div className="flex flex-col p-5">
              <div>
                <h3 className="text-gray-600">Nationality</h3>
              </div>
              <div className="font-medium">{`${record?.employee.nationality}`}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
