import type { Metadata } from 'next';

import { SignInForm } from '@/features/auth/components/sign-in-form';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to get access to the main features.',
};

function SignInPage() {
  return <SignInForm />;
}

export default SignInPage;
