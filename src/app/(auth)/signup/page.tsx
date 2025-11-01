import type { Metadata } from 'next';

import { SignUpForm } from '@/features/auth/components/sign-up-form';

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Sign up to get access to the main features.',
};

function SignUpPage() {
  return <SignUpForm />;
}

export default SignUpPage;
