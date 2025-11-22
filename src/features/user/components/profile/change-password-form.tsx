'use client';

import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

import type { ChangePasswordValues } from '@/features/user/schemas';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { TextInputField } from '@/components/ui/text-input-field';
import { changePassword } from '@/features/user/actions';
import { ChangePasswordFormSchema } from '@/features/user/schemas';

export const ChangePasswordForm = () => {
  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordValues> = async values => {
    const res = await changePassword(values);
    if (!res.success) {
      return form.setError('root', {
        message: res.error,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 md:w-xs"
      >
        <TextInputField
          control={form.control}
          name="password"
          label="Password"
          type="password"
          testId="profile-password-field"
        />
        <TextInputField
          control={form.control}
          name="newPassword"
          label="New Password"
          type="password"
          testId="profile-newPassword-field"
        />
        <TextInputField
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          testId="profile-confirmPassword-field"
        />

        {form.formState.errors.root?.message && (
          <p className="text-destructive bg-destructive/10 rounded-md px-3 py-2">
            {form.formState.errors.root?.message}
          </p>
        )}
        <Button
          disabled={form.formState.isSubmitting}
          className="text-md mx-auto w-full cursor-pointer text-center"
          data-testid="profile-submit"
        >
          {form.formState.isSubmitting && <LoaderCircle className="animate-spin" />}
          Save
        </Button>
      </form>
    </Form>
  );
};
