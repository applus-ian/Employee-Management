import { z } from 'zod';

export const updateResidentialInfoSchema = z.object({
  region: z.string().min(1, 'Region is required'),
  province: z.string().min(1, 'Province is required'),
  city_or_municipality: z.string().min(1, 'City/Municipality is required'),
  barangay: z.string().min(1, 'Barangay is required'),
  street: z.string().optional(),
});

export type UpdateResidentialInfoInput = z.infer<typeof updateResidentialInfoSchema>;
