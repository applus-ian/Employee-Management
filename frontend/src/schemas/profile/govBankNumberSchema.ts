import { z } from 'zod';

export const updateGovBankNumberSchema = z.object({
  tin_number: z.string().min(1, 'TIN number is required'),
  sss_number: z.string().min(1, 'SSS number is required'),
  pagibig_number: z.string().min(1, 'Pag-IBIG number is required'),
  philhealth_number: z.string().min(1, 'Philhealth number is required'),
  bank_number: z.string().min(1, 'Bank number is required'),
});

export type UpdateGovBankNumberInput = z.infer<typeof updateGovBankNumberSchema>;
