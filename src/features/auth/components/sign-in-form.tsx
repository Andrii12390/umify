'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';

import type { SignInValues } from '@/features/auth/schemas';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { TextInputField } from '@/components/ui/text-input-field';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/constants';
import { SocialOptions } from '@/features/auth/components/social-options';
import { PROVIDERS } from '@/features/auth/constants';
import { SignInFormSchema } from '@/features/auth/schemas';

export const SignInForm = () => {
  const router = useRouter();

  const form = useForm<SignInValues>({
    resolver: zodResolver(SignInFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignInValues> = async values => {
    try {
      const result = await signIn(PROVIDERS.CREDENTIALS, {
        ...values,
        redirect: false,
      });

      if (result?.ok) {
        router.push(PRIVATE_ROUTES.LOBBY);
      }
    } catch (error) {
      form.setError('root', {
        message: error instanceof Error ? error.message : 'Something went wrong',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="shadow-primary/25 border-border flex w-xs flex-col gap-4 rounded-md border p-10 shadow-2xl md:w-sm"
      >
        <h3
          className="text-center text-2xl font-semibold"
          data-testid="signIn-form-title"
        >
          Sign In
        </h3>
        <TextInputField
          control={form.control}
          label="Email"
          name="email"
          type="email"
          testId="signIn-email-field"
        />
        <TextInputField
          control={form.control}
          label="Password"
          name="password"
          type="password"
          testId="signIn-password-field"
        />
        <Link
          href={PUBLIC_ROUTES.SIGN_UP}
          className="text-sm"
          data-testid="signIn-register-link"
        >
          Don&apos;t have an account?
        </Link>
        <SocialOptions />
        {form.formState.errors.root?.message && (
          <p className="text-destructive bg-destructive/10 rounded-md px-3 py-2">
            {form.formState.errors.root?.message}
          </p>
        )}

        <Button
          disabled={form.formState.isSubmitting}
          className="text-md mx-auto mt-4 w-1/2 text-center"
          data-testid="signIn-submit"
        >
          {form.formState.isSubmitting && <LoaderCircle className="animate-spin" />}
          Sign in
        </Button>
      </form>
    </Form>
  );
};
