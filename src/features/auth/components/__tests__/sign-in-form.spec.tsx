import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, vi, it, expect, beforeEach } from 'vitest';

import { PUBLIC_ROUTES } from '@/constants';
import { SignInForm } from '@/features/auth/components';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('SignInForm component test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('Should render correct title and fields', () => {
      render(<SignInForm />);

      expect(screen.getByTestId('signIn-form-title')).toHaveTextContent('Sign In');

      const emailField = screen.getByTestId('signIn-email-field');
      expect(emailField).toHaveAttribute('type', 'email');

      const passwordField = screen.getByTestId('signIn-password-field');
      expect(passwordField).toHaveAttribute('type', 'password');
    });

    it('Should render social options', () => {
      render(<SignInForm />);

      expect(screen.getByTestId('social-options')).toBeInTheDocument();
    });

    it('Should render registration link with correct href', () => {
      render(<SignInForm />);

      expect(screen.getByTestId('signIn-register-link')).toHaveAttribute(
        'href',
        PUBLIC_ROUTES.SIGN_UP,
      );
    });
  });

  describe('Form validation', () => {
    it('Should show required field when submitting empty form', async () => {
      render(<SignInForm />);

      await userEvent.click(screen.getByTestId('signIn-submit'));

      await waitFor(() => {
        expect(screen.getByText('Invalid email')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    it('Should show error if email is invalid', async () => {
      render(<SignInForm />);

      const emailField = screen.getByTestId('signIn-email-field');

      await userEvent.type(emailField, 'invalid_format');

      await waitFor(() => {
        expect(screen.getByText('Invalid email')).toBeInTheDocument();
      });
    });
  });
});
