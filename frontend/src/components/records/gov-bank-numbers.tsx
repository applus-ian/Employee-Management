import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EditGovBankNumbers from './edit-gov-bank-numbers';
import { UserSchema } from '@/schemas';

interface Props {
  record?: UserSchema;
}

export default function GovBankNumbers({ record }: Props) {
  const user_id = record?.id || '';
  return (
    <Card className="rounded-xl border shadow-sm">
      <CardHeader>
        <div className="flex justify-between">
          <div className="order-1">
            <CardTitle>🏛️ Government and Bank Numbers</CardTitle>
          </div>

          {/* Modal Trigger */}
          <EditGovBankNumbers user_id={user_id} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Bank Account Number</h3>
            </div>
            <div className="font-medium">{`${record?.employee.bank_number}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Social Security System Number</h3>
            </div>
            <div className="font-medium">{`${record?.employee.sss_number}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Pag-IBIG Number</h3>
            </div>
            <div className="font-medium">{`${record?.employee.pagibig_number}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Philhealth Number</h3>
            </div>
            <div className="font-medium">{`${record?.employee.philhealth_number}`}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Taxpayer Identification Number</h3>
            </div>
            <div className="font-medium">{`${record?.employee.tin_number}`}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
