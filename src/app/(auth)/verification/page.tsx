import type { Metadata } from 'next';

import { VerificationForm } from '@/features/auth/components/verification-form';

export const metadata: Metadata = {
  title: 'Verification',
  description: 'Verify your account to complete registration.',
};

function VerificationPage() {
  return <VerificationForm />;
}

export default VerificationPage;
