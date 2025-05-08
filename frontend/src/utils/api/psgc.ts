// lib/api/psgc.ts
import { PSGCOption } from '@/types/psgc';

const BASE_URL = 'https://psgc.gitlab.io/api';

export const fetchRegions = async (): Promise<PSGCOption[]> => {
  const res = await fetch(`${BASE_URL}/regions/`);
  return res.json();
};

export const fetchProvinces = async (regionCode: string): Promise<PSGCOption[]> => {
  const res = await fetch(`${BASE_URL}/regions/${regionCode}/provinces/`);
  return res.json();
};

export const fetchCities = async (provinceCode: string): Promise<PSGCOption[]> => {
  const res = await fetch(`${BASE_URL}/provinces/${provinceCode}/cities-municipalities/`);
  return res.json();
};

export const fetchBarangays = async (cityCode: string): Promise<PSGCOption[]> => {
  const res = await fetch(`${BASE_URL}/cities-municipalities/${cityCode}/barangays/`);
  return res.json();
};

export const fetchPSGCNameByCode = async (
  level: 'regions' | 'provinces' | 'cities-municipalities' | 'barangays',
  code: string,
): Promise<string> => {
  try {
    const res = await fetch(`https://psgc.gitlab.io/api/${level}/${code}/`);
    const data = await res.json();
    return data.name;
  } catch (error) {
    console.error(`Error fetching ${level} for code ${code}:`, error);
    return code; // fallback to code if error
  }
};
