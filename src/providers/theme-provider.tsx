import { ThemeProvider as Provider } from 'next-themes';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider
      attribute="class"
      enableSystem={true}
    >
      {children}
    </Provider>
  );
};
