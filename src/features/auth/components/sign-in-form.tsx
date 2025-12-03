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
import { FormError } from '@/components/ui/form-error';
import { TextInputField } from '@/components/ui/text-input-field';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/constants';
import { SocialOptions } from '@/features/auth/components/social-options';
import { PROVIDERS } from '@/features/auth/constants';
import { SignInFormSchema } from '@/features/auth/schemas';

const defaultValues = {
  email: '',
  password: '',
} satisfies SignInValues;

export const SignInForm = () => {
  const router = useRouter();

  const form = useForm<SignInValues>({
    resolver: zodResolver(SignInFormSchema),
    mode: 'onChange',
    defaultValues,
  });

  const { isSubmitting, errors } = form.formState;

  const onSubmit: SubmitHandler<SignInValues> = async values => {
    const result = await signIn(PROVIDERS.CREDENTIALS, {
      ...values,
      redirect: false,
    });

    if (result?.ok) {
      return router.push(PRIVATE_ROUTES.DIAGRAMS);
    }

    if (result?.error) {
      form.setError('root', {
        message: result.error,
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
        <FormError message={errors.root?.message} />
        <Button
          disabled={isSubmitting}
          className="text-md mx-auto mt-4 w-1/2 cursor-pointer text-center"
          data-testid="signIn-submit"
        >
          {isSubmitting && <LoaderCircle className="animate-spin" />}
          Sign in
        </Button>
      </form>
    </Form>
  );
};
