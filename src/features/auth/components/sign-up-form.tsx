'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';

import type { SignUpValues } from '@/features/auth/schemas';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormError } from '@/components/ui/form-error';
import { TextInputField } from '@/components/ui/text-input-field';
import { PUBLIC_ROUTES } from '@/constants';
import { registerUser } from '@/features/auth/actions';
import { SocialOptions } from '@/features/auth/components/social-options';
import { PROVIDERS } from '@/features/auth/constants';
import { SignUpFormSchema } from '@/features/auth/schemas';
import { authService } from '@/features/auth/services';

const defaultValues = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
} satisfies SignUpValues;

export const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(SignUpFormSchema),
    mode: 'onChange',
    defaultValues,
  });

  const { isSubmitting, errors } = form.formState;

  const onSubmit: SubmitHandler<SignUpValues> = async values => {
    const res = await registerUser(values);
    if (res.success) {
      const signInRes = await signIn(PROVIDERS.CREDENTIALS, {
        ...values,
        redirect: false,
      });

      if (signInRes?.ok) {
        await authService.sendCode();
        router.push(PUBLIC_ROUTES.VERIFICATION);
      }
    } else {
      form.setError('root', {
        message: res.error,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-primary/25 dark:shadow-primary/50 border-border flex w-xs flex-col gap-4 rounded-md border p-10 shadow-2xl lg:w-sm"
      >
        <h3
          className="text-center text-2xl font-semibold"
          data-testid="signUp-form-title"
        >
          Sign Up
        </h3>
        <TextInputField
          control={form.control}
          label="Email"
          name="email"
          type="email"
          testId="signUp-email-field"
        />
        <TextInputField
          control={form.control}
          label="Username"
          name="username"
          type="text"
          testId="signUp-username-field"
        />
        <TextInputField
          control={form.control}
          label="Password"
          name="password"
          type="password"
          testId="signUp-password-field"
        />
        <TextInputField
          control={form.control}
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          testId="signUp-confirmPassword-field"
        />
        <Link
          href={PUBLIC_ROUTES.SIGN_IN}
          data-testid="signUp-login-link"
          className="text-sm"
        >
          Already have an account?
        </Link>
        <FormError message={errors.root?.message} />
        <SocialOptions />
        <Button
          disabled={isSubmitting}
          className="text-md mx-auto mt-4 w-1/2 text-center"
          data-testid="signUp-submit"
        >
          {isSubmitting && <LoaderCircle className="animate-spin" />}
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
