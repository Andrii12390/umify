import type { NextRequest } from 'next/server';

import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/constants';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req });

  const isAuthPage = pathname === PUBLIC_ROUTES.SIGN_IN || pathname === PUBLIC_ROUTES.SIGN_UP;
  const isVerificationPage = pathname === PUBLIC_ROUTES.VERIFICATION;

  if ((token && isAuthPage) || (isVerificationPage && token?.isVerified)) {
    return NextResponse.redirect(new URL(PRIVATE_ROUTES.DIAGRAMS, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/signup',
    '/verification',
    '/diagrams/:path*',
    '/profile/:path*',
    '/favorites/:path*',
    '/settings/:path*',
  ],
};
