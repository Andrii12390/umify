import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Resend } from 'resend';

import { VerificationTemplate } from '@/features/auth/components/email-templates';
import { apiError, apiSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/utils';

export const POST = withAuth(async (req, _, user) => {
  try {
    const code = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.verificationCode.create({
      data: {
        userId: user.id,
        code,
        expiresAt,
      },
    });

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.EMAIL_DOMAIN ?? 'onboarding@resend.dev',
      to: user.email,
      subject: 'Umify | Verification',
      react: VerificationTemplate({ code }),
    });

    return apiSuccess(null, ReasonPhrases.OK, StatusCodes.OK);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

export const PATCH = withAuth(async (req, _, user) => {
  try {
    const { code } = await req.json();

    if (!code) {
      return apiError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
    }

    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        userId: user.id,
        code: parseInt(code),
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!verificationCode) {
      return apiError('Invalid code', StatusCodes.BAD_REQUEST);
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
      },
    });

    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    return apiSuccess(null, ReasonPhrases.OK, StatusCodes.OK);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
});
