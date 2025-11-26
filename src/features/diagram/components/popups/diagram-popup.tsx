import type { PropsWithChildren } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { TextInputField } from '@/components/ui/text-input-field';

import type { DiagramFormValues } from '../../schemas';

import { DiagramFormSchema } from '../../schemas';

interface Props extends PropsWithChildren {
  title: string;
  submitLabel: string;
  defaults?: { name: string };
  onSubmit: (values: DiagramFormValues, api: { reset: () => void }) => void | Promise<void>;
  disabled?: boolean;
}

const defaultValues: { name: string } = {
  name: '',
};

export const DiagramPopup = ({
  title,
  submitLabel,
  defaults,
  onSubmit,
  disabled,
  children,
}: Props) => {
  const form = useForm<DiagramFormValues>({
    resolver: zodResolver(DiagramFormSchema),
    mode: 'onChange',
    defaultValues: { ...defaultValues, ...defaults },
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
    form.reset(defaultValues);
  };

  const handleSubmit: SubmitHandler<DiagramFormValues> = values => {
    onSubmit(values, {
      reset: () => {
        form.reset(defaultValues);
        setIsOpen(false);
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle
            asChild
            className="text-2xl"
          >
            <h3 className="text-center font-semibold">{title}</h3>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <TextInputField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Diagram name..."
            />

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="cursor-pointer"
                onClick={handleCancel}
                disabled={disabled}
              >
                Cancel
              </Button>
              <Button
                size="lg"
                className="cursor-pointer"
                disabled={disabled}
              >
                {submitLabel}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
