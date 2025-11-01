import { API_ROUTES } from '@/features/auth/constants';
import { api } from '@/lib/api';

export const authService = {
  sendCode: () => api.post<null, null>(API_ROUTES.SEND_CODE),
  verifyCode: (code: string) => api.patch<null, { code: string }>(API_ROUTES.VERIFY_CODE, { code }),
};
