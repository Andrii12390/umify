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

export const ChangePasswordFormSchema = z
  .object({
    password: z.string().trim().min(1, 'Password is required'),
    newPassword: z
      .string()
      .trim()
      .min(6, 'Password cannot be shorter than 6 characters')
      .max(25, 'Password cannot be longer than 25 characters'),
    confirmPassword: z.string().trim().min(1, 'Confirmation password is required'),
  })
  .refine(values => values.newPassword === values.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type ProfileValues = z.infer<typeof ProfileFormSchema>;
export type ChangePasswordValues = z.infer<typeof ChangePasswordFormSchema>;
