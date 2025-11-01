import { z } from 'zod';

const emailSchema = z.email('Invalid email');

export const SignInFormSchema = z.object({
  email: emailSchema,
  password: z.string().trim().min(1, 'Password is required'),
});

export const SignUpFormSchema = z
  .object({
    email: emailSchema,
    username: z
      .string()
      .trim()
      .min(3, 'Username cannot be shorter than 3 characters')
      .max(25, 'Username cannot be longer than 25 characters'),
    password: z
      .string()
      .trim()
      .min(6, 'Password cannot be shorter than 6 characters')
      .max(25, 'Password cannot be longer than 25 characters'),
    confirmPassword: z.string().trim().min(1, 'Confirmation password is required'),
  })
  .refine(values => values.password === values.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignInValues = z.infer<typeof SignInFormSchema>;
export type SignUpValues = z.infer<typeof SignUpFormSchema>;
