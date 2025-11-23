'use client';

import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { times } from 'lodash-es';
import { LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormError } from '@/components/ui/form-error';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useVerification } from '@/features/auth/hooks';

const OTP_LENGTH = 6;

export const VerificationForm = () => {
  const { code, setCode, isSubmitting, error, handleSubmit, handleResend } = useVerification();

  return (
    <form
      className="shadow-primary/25 border-border flex min-w-84 flex-col items-center gap-4 rounded-md border p-10 shadow-2xl"
      onSubmit={handleSubmit}
      data-testid="verification-form"
    >
      <h3
        className="text-center text-2xl font-bold"
        data-testid="verification-title"
      >
        Verify your email
      </h3>
      <p className="text-center text-sm">
        We have sent a verification code to <br /> your email address
      </p>
      <InputOTP
        maxLength={OTP_LENGTH}
        pattern={REGEXP_ONLY_DIGITS}
        autoFocus
        onChange={e => setCode(e)}
        value={code}
        data-testid="verification-otp-input"
      >
        <InputOTPGroup className="mb-2">
          {times(OTP_LENGTH, idx => (
            <InputOTPSlot
              className="p-5 text-xl"
              index={idx}
              key={idx}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <FormError message={error} />
      <Button
        size="lg"
        className="w-2/3 text-lg tracking-wide"
        data-testid="verification-submit"
        disabled={isSubmitting}
      >
        {isSubmitting && <LoaderCircle className="animate-spin" />}
        Verify
      </Button>
      <div>
        <p>Didn&apos;t receive the code?</p>
        <button
          type="button"
          className="text-primary hover:text-primary/80 w-full cursor-pointer font-semibold"
          onClick={handleResend}
          data-testid="verification-resend"
          disabled={isSubmitting}
        >
          Resend code
        </button>
      </div>
    </form>
  );
};
