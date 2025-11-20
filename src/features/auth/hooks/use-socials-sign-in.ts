import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

import { PRIVATE_ROUTES } from '@/constants';
import { PROVIDERS } from '@/features/auth/constants';

export const useSocialSignIn = () => {
  const signInGoogle = async () => {
    try {
      await signIn(PROVIDERS.GOOGLE, {
        callbackUrl: PRIVATE_ROUTES.DIAGRAMS,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  const signInGitHub = async () => {
    try {
      await signIn(PROVIDERS.GITHUB, {
        callbackUrl: PRIVATE_ROUTES.DIAGRAMS,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  return {
    signInGoogle,
    signInGitHub,
  };
};
