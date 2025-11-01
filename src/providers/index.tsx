'use client';

import { SessionProvider } from './session-provider';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
