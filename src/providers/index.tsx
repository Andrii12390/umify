'use client';

import { SessionProvider } from './session-provider';
import { ThemeProvider } from './theme-provider';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
};
