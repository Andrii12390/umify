import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, vi, it, expect, beforeEach } from 'vitest';

import { PUBLIC_ROUTES } from '@/constants';
import { SignUpForm } from '@/features/auth/components';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('SignUpForm component test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('Should render correct title and fields', () => {
      render(<SignUpForm />);

      expect(screen.getByTestId('signUp-form-title')).toHaveTextContent('Sign Up');

      const usernameField = screen.getByTestId('signUp-username-field');
      expect(usernameField).toHaveAttribute('type', 'text');

      const emailField = screen.getByTestId('signUp-email-field');
      expect(emailField).toHaveAttribute('type', 'email');

      const passwordField = screen.getByTestId('signUp-password-field');
      expect(passwordField).toHaveAttribute('type', 'password');

      const confirmPasswordField = screen.getByTestId('signUp-confirmPassword-field');
      expect(confirmPasswordField).toHaveAttribute('type', 'password');
    });

    it('Should render social options', () => {
      render(<SignUpForm />);

      expect(screen.getByTestId('social-options')).toBeInTheDocument();
    });

    it('Should render registration link with correct href', () => {
      render(<SignUpForm />);

      expect(screen.getByTestId('signUp-login-link')).toHaveAttribute(
        'href',
        PUBLIC_ROUTES.SIGN_IN,
      );
    });
  });

  describe('Form validation', () => {
    it('Should show required field when submitting empty form', async () => {
      render(<SignUpForm />);

      await userEvent.click(screen.getByTestId('signUp-submit'));

      await waitFor(() => {
        expect(screen.getByText('Invalid email')).toBeInTheDocument();
        expect(
          screen.getByText('Username cannot be shorter than 3 characters'),
        ).toBeInTheDocument();
        expect(
          screen.getByText('Password cannot be shorter than 6 characters'),
        ).toBeInTheDocument();
        expect(screen.getByText('Confirmation password is required')).toBeInTheDocument();
      });
    });

    it('Should show error if email is invalid', async () => {
      render(<SignUpForm />);

      const emailField = screen.getByTestId('signUp-email-field');

      await userEvent.type(emailField, 'invalid_format');

      await waitFor(() => {
        expect(screen.getByText('Invalid email')).toBeInTheDocument();
      });
    });

    it("Should show error if passwords don't match", async () => {
      render(<SignUpForm />);

      const passwordField = screen.getByTestId('signUp-password-field');
      const confirmPasswordField = screen.getByTestId('signUp-confirmPassword-field');

      await userEvent.type(passwordField, 'password123');
      await userEvent.type(confirmPasswordField, 'password321');

      await waitFor(() => {
        expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
      });
    });
  });
});
