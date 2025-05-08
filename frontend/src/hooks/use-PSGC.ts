// hooks/usePSGC.ts
import { useEffect, useState } from 'react';
import { PSGCOption } from '@/types/psgc';
import { fetchRegions, fetchProvinces, fetchCities, fetchBarangays } from '@/utils/api/psgc';

type UsePSGCProps = {
  initialRegion?: string;
  initialProvince?: string;
  initialCity?: string;
  initialBarangay?: string;
  initialStreet?: string;
};

export const usePSGC = ({
  initialRegion = '',
  initialProvince = '',
  initialCity = '',
  initialBarangay = '',
  initialStreet = '',
}: UsePSGCProps) => {
  const [regions, setRegions] = useState<PSGCOption[]>([]);
  const [provinces, setProvinces] = useState<PSGCOption[]>([]);
  const [cities, setCities] = useState<PSGCOption[]>([]);
  const [barangays, setBarangays] = useState<PSGCOption[]>([]);

  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedProvince, setSelectedProvince] = useState(initialProvince);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedBarangay, setSelectedBarangay] = useState(initialBarangay);
  const [street, setStreet] = useState(initialStreet);

  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingBarangays, setLoadingBarangays] = useState(false);

  useEffect(() => {
    fetchRegions()
      .then(setRegions)
      .catch((err) => console.error('Failed to load regions:', err));
  }, []);

  useEffect(() => {
    const regionCode = selectedRegion || initialRegion;
    if (regionCode) {
      setLoadingProvinces(true);
      fetchProvinces(regionCode)
        .then((data) => {
          setProvinces(data);
          setLoadingProvinces(false);
        })
        .catch(() => setLoadingProvinces(false));
    } else {
      setProvinces([]);
    }
  }, [selectedRegion, initialRegion]);

  useEffect(() => {
    const provinceCode = selectedProvince || initialProvince;
    if (provinceCode) {
      setLoadingCities(true);
      fetchCities(provinceCode)
        .then((data) => {
          setCities(data);
          setLoadingCities(false);
        })
        .catch(() => setLoadingCities(false));
    } else {
      setCities([]);
    }
  }, [selectedProvince, initialProvince]);

  useEffect(() => {
    const cityCode = selectedCity || initialCity;
    if (cityCode) {
      setLoadingBarangays(true);
      fetchBarangays(cityCode)
        .then((data) => {
          setBarangays(data);
          setLoadingBarangays(false);
        })
        .catch(() => setLoadingBarangays(false));
    } else {
      setBarangays([]);
    }
  }, [selectedCity, initialCity]);

  useEffect(() => {
    if (initialProvince && provinces.length > 0) {
      const valid = provinces.find((p) => p.code === initialProvince);
      if (valid) setSelectedProvince(initialProvince);
    }
  }, [provinces, initialProvince]);

  useEffect(() => {
    if (initialCity && cities.length > 0) {
      const valid = cities.find((c) => c.code === initialCity);
      if (valid) setSelectedCity(initialCity);
    }
  }, [cities, initialCity]);

  useEffect(() => {
    if (initialBarangay && barangays.length > 0) {
      const valid = barangays.find((b) => b.code === initialBarangay);
      if (valid) setSelectedBarangay(initialBarangay);
    }
  }, [barangays, initialBarangay]);

  return {
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
  };
};
