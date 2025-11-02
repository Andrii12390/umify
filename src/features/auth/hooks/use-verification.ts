import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { PRIVATE_ROUTES } from '@/constants';
import { authService } from '@/features/auth/services';

export const useVerification = () => {
  const router = useRouter();

  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await authService.verifyCode(code);

    if (!res.success) {
      setError(res.message);
    } else {
      router.replace(PRIVATE_ROUTES.DIAGRAMS);
    }
    setIsSubmitting(false);
  };

  const handleResend = async () => {
    const res = await authService.sendCode();

    if (!res.success) {
      setError(res.message);
    }
  };

  return {
    code,
    setCode,
    isSubmitting,
    error,
    handleSubmit,
    handleResend,
  };
};
