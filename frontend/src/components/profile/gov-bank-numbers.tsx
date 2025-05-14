import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import EditGovBankNumbers from './edit-gov-bank-numbers';

export default function GovBankNumbers() {
  const authContext = useContext(AuthContext);

  return (
    <Card className="h-fit m-5 bg-white shadow-md">
      <CardHeader className="text-xl">
        <div className="flex justify-between">
          <div className="order-1">
            <CardTitle>Government and Bank Numbers</CardTitle>
          </div>

          {/* Modal Trigger */}
          <EditGovBankNumbers />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Bank Account Number</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.bank_number}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Social Security System Number</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.sss_number}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Pag-IBIG Number</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.pagibig_number}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Philhealth Number</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.philhealth_number}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Taxpayer Identification Number</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.tin_number}`}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
