import { FilePenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import PSGCSelect from './psgc-select'; // Import PSGCSelect component

export default function EditResidentialInformation() {
  const authContext = useContext(AuthContext);
  const employee = authContext.user?.employee;

  // Handle form submission
  const handleSave = () => {
    // handle data to be saved
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="order-2">
          <FilePenLine size={22} strokeWidth={2} className="text-[#EE7A2A]" />
        </button>
      </DialogTrigger>

      <DialogContent className="w-full lg:!max-w-[60rem] lg:h-fit md:h-auto sm:h-[90vh] h-[90vh] flex flex-col">
        <DialogHeader className="shrink-0 pb-4">
          <DialogTitle>Edit Residential Information</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto lg:flex-0 lg:px-0 md:overflow-y-auto md:flex-1 md:px-5 sm:overflow-y-auto sm:flex-1 sm:px-5">
          <form action="" method="post">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* PSGCSelect component */}
              <div className="flex flex-col p-5 col-span-1 md:col-span-2 lg:col-span-3">
                <PSGCSelect
                  initialRegion={employee?.region}
                  initialProvince={employee?.province}
                  initialCity={employee?.city_or_municipality}
                  initialBarangay={employee?.barangay}
                  initialStreet={employee?.street}
                />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-3 px-5 pt-5 flex justify-center gap-x-6">
                <Button onClick={handleSave} className="bg-[#EE7A2A] text-white w-[10rem]">
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
