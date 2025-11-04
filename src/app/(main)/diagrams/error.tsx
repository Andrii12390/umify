'use client';

import { RotateCw } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    toast.error('Failed to Load Diagrams', {
      description: error.message,
    });
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-4">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <Button
        onClick={reset}
        size="lg"
      >
        <RotateCw /> Try to Refresh
      </Button>
    </div>
  );
}

export default Error;
