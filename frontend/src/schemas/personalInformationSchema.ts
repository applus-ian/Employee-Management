import { z } from 'zod';

export const updatePersonalInfoSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, 'Last name is required'),
  suffix: z.string().optional(),
  email: z.string().email(),
  phone_number: z.string(),
  emergency_contact1: z.string().optional(),
  emergency_contact2: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']),
  birthdate: z.string(), // Can also use z.coerce.date() if you convert to Date
  civil_status: z.enum(['single', 'married', 'divorced', 'widowed']),
  nationality: z.string().optional(),
});

export type UpdatePersonalInfoInput = z.infer<typeof updatePersonalInfoSchema>;
