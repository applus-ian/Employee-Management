import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePSGC } from '@/hooks/profile/use-PSGC';

type PSGCSelectProps = {
  initialRegion?: string;
  initialProvince?: string;
  initialCity?: string;
  initialBarangay?: string;
  onChange?: (field: string, value: string) => void;

  // Lifting state up
  onRegionChange: (value: string) => void;
  onProvinceChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onBarangayChange: (value: string) => void;
};

const PSGCSelect: React.FC<PSGCSelectProps> = (props) => {
  const {
    regions,
    provinces,
    cities,
    barangays,
    selectedRegion,
    selectedProvince,
    selectedCity,
    selectedBarangay,
    loadingProvinces,
    loadingCities,
    loadingBarangays,
    setSelectedRegion,
    setSelectedProvince,
    setSelectedCity,
    setSelectedBarangay,
  } = usePSGC({
    initialRegion: props.initialRegion,
    initialProvince: props.initialProvince,
    initialCity: props.initialCity,
    initialBarangay: props.initialBarangay,
  });

  // Watch state changes and lift them up
  React.useEffect(() => {
    props.onRegionChange(selectedRegion);
  }, [selectedRegion]);

  React.useEffect(() => {
    props.onProvinceChange(selectedProvince);
  }, [selectedProvince]);

  React.useEffect(() => {
    props.onCityChange(selectedCity);
  }, [selectedCity]);

  React.useEffect(() => {
    props.onBarangayChange(selectedBarangay);
  }, [selectedBarangay]);

  return (
    <div className="flex flex-col p-5 col-span-1 md:col-span-2 lg:col-span-3 space-y-4">
      {/* Region */}
      <div>
        <label className="block text-sm font-medium mb-1">Region</label>
        <Select
          value={selectedRegion}
          onValueChange={(value) => {
            setSelectedRegion(value);
            props.onChange?.('region', value);
          }}
          disabled={loadingProvinces}
        >
          <SelectTrigger className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg rounded-lg border border-gray-200 max-h-[300px] overflow-y-auto">
            {regions.map((r) => (
              <SelectItem key={r.code} value={r.code}>
                {r.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Province */}
      <div>
        <label className="block text-sm font-medium mb-1">Province</label>
        <Select
          value={selectedProvince}
          onValueChange={(value) => {
            setSelectedProvince(value);
            props.onChange?.('province', value);
          }}
          disabled={loadingProvinces}
        >
          <SelectTrigger className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
            <SelectValue placeholder="Select Province" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg rounded-lg border border-gray-200 max-h-[300px] overflow-y-auto">
            {provinces.map((p) => (
              <SelectItem key={p.code} value={p.code}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium mb-1">City/Municipality</label>
        <Select
          value={selectedCity}
          onValueChange={(value) => {
            setSelectedCity(value);
            props.onChange?.('city', value);
          }}
          disabled={loadingCities}
        >
          <SelectTrigger className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg rounded-lg border border-gray-200 max-h-[300px] overflow-y-auto">
            {cities.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Barangay */}
      <div>
        <label className="block text-sm font-medium mb-1">Barangay</label>
        <Select
          value={selectedBarangay}
          onValueChange={(value) => {
            setSelectedBarangay(value);
            props.onChange?.('barangay', value);
          }}
          disabled={loadingBarangays}
        >
          <SelectTrigger className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
            <SelectValue placeholder="Select Barangay" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg rounded-lg border border-gray-200 max-h-[300px] overflow-y-auto">
            {barangays.map((b) => (
              <SelectItem key={b.code} value={b.code}>
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PSGCSelect;
