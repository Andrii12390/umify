import type { NextRequest } from 'next/server';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import type { User } from '@/types';

import { getUser } from '@/actions';
import { apiError } from '@/lib/api';

type AuthenticatedApiHandler<T = unknown> = (
  req: NextRequest,
  context: { params: Promise<T> },
  user: User,
) => Promise<Response> | Response;

export const withAuth = <T>(handler: AuthenticatedApiHandler<T>) => {
  return async (req: NextRequest, context: { params: Promise<T> }) => {
    try {
      const user = await getUser();

      if (!user) {
        return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
      }

      return handler(req, context, user);
    } catch {
      return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };
};
