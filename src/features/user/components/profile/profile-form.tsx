'use client';

import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { ProfileValues } from '@/features/user/schemas';
import type { User } from '@/types';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ImageUpload } from '@/components/ui/image-upload';
import { TextInputField } from '@/components/ui/text-input-field';
import { updateUser } from '@/features/user/actions';
import { ProfileFormSchema } from '@/features/user/schemas';

interface Props {
  initialValues: Partial<User>;
}

export const ProfileForm = ({ initialValues }: Props) => {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(ProfileFormSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      photo: initialValues?.imageUrl ?? undefined,
      ...initialValues,
    },
  });

  const onSubmit: SubmitHandler<ProfileValues> = async values => {
    const res = await updateUser(values);

    if (!res.success) {
      return toast.error(res.error);
    }

    toast.success('Profile updated successfully');
  };

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 md:w-xs"
      >
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem
              className="w-full"
              data-testid="profile-picture-field"
            >
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <TextInputField
          control={form.control}
          label="Username"
          name="username"
          testId="profile-username-field"
        />

        <Button
          disabled={isSubmitting}
          className="text-md mx-auto mt-2 w-full cursor-pointer text-center"
          data-testid="profile-submit"
        >
          {isSubmitting && <LoaderCircle className="animate-spin" />}
          Save
        </Button>
      </form>
    </Form>
  );
};
