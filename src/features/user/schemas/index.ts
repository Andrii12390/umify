import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const emailSchema = z.email('Invalid email');

export const ProfileFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username cannot be shorter than 3 characters')
    .max(25, 'Username cannot be longer than 25 characters'),
  email: emailSchema,
  photo: z
    .instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE, 'Max file size is 10MB')
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported',
    )
    .optional()
    .or(z.string().optional()),
});

export type ProfileValues = z.infer<typeof ProfileFormSchema>;
