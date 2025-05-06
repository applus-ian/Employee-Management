// components/PSGCSelect.tsx
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '../ui/input';
import { usePSGC } from '@/hooks/use-PSGC';

type PSGCSelectProps = {
  initialRegion?: string;
  initialProvince?: string;
  initialCity?: string;
  initialBarangay?: string;
  initialStreet?: string;
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
    street,
    loadingProvinces,
    loadingCities,
    loadingBarangays,
    setSelectedRegion,
    setSelectedProvince,
    setSelectedCity,
    setSelectedBarangay,
    setStreet,
  } = usePSGC(props);

  return (
    <div className="flex flex-col p-5 col-span-1 md:col-span-2 lg:col-span-3">
      {/* Region */}
      <div>
        <label className="block text-sm font-medium mb-1">Region</label>
        <Select value={selectedRegion} onValueChange={setSelectedRegion} disabled={loadingProvinces}>
          <SelectTrigger className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent className="bg-gray-100">
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
        <Select value={selectedProvince} onValueChange={setSelectedProvince} disabled={loadingProvinces}>
          <SelectTrigger className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
            <SelectValue placeholder="Select Province" />
          </SelectTrigger>
          <SelectContent className="bg-gray-100">
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
        <Select value={selectedCity} onValueChange={setSelectedCity} disabled={loadingCities}>
          <SelectTrigger className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent className="bg-gray-100">
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
        <Select value={selectedBarangay} onValueChange={setSelectedBarangay} disabled={loadingBarangays}>
          <SelectTrigger className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
            <SelectValue placeholder="Select Barangay" />
          </SelectTrigger>
          <SelectContent className="bg-gray-100">
            {barangays.map((b) => (
              <SelectItem key={b.code} value={b.code}>
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Street */}
      <div>
        <label className="block text-sm font-medium mb-1">Street</label>
        <Input
          className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Enter street"
        />
      </div>
    </div>
  );
};

export default PSGCSelect;
