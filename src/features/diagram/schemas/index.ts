import { z } from 'zod';

export const DiagramFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Name should be at least 3 characters long')
    .max(50, 'Name should be no longer than 30 characters'),
});

export type DiagramFormValues = z.infer<typeof DiagramFormSchema>;
