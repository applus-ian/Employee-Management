import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthContext } from '@/context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import EditResidentialInformation from './edit-residential-information';
import { fetchPSGCNameByCode } from '@/utils/api/psgc';

export default function ResidentialInformation() {
  const authContext = useContext(AuthContext);

  const [regionName, setRegionName] = useState('');
  const [provinceName, setProvinceName] = useState('');
  const [cityName, setCityName] = useState('');
  const [barangayName, setBarangayName] = useState('');

  useEffect(() => {
    const fetchNames = async () => {
      const emp = authContext.user?.employee;
      if (!emp) return;

      const [region, province, city, barangay] = await Promise.all([
        fetchPSGCNameByCode('regions', emp.region),
        fetchPSGCNameByCode('provinces', emp.province),
        fetchPSGCNameByCode('cities-municipalities', emp.city_or_municipality),
        fetchPSGCNameByCode('barangays', emp.barangay),
      ]);

      setRegionName(region);
      setProvinceName(province);
      setCityName(city);
      setBarangayName(barangay);
    };

    fetchNames();
  }, [authContext.user]);

  return (
    <Card className="h-fit m-5 bg-white shadow-md">
      <CardHeader className="text-xl">
        <div className="flex justify-between">
          <div className="order-1">
            <CardTitle>Residential Information</CardTitle>
          </div>

          {/* Modal Trigger */}
          <EditResidentialInformation />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Region</h3>
            </div>
            <div className="font-medium">{regionName}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Province</h3>
            </div>
            <div className="font-medium">{provinceName}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">City/Municipality</h3>
            </div>
            <div className="font-medium">{cityName}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Barangay</h3>
            </div>
            <div className="font-medium">{barangayName}</div>
          </div>
          <div className="flex flex-col p-5">
            <div>
              <h3 className="text-gray-600">Street</h3>
            </div>
            <div className="font-medium">{`${authContext.user?.employee.street}`}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
