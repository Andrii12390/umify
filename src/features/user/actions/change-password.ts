'use server';

import bcrypt from 'bcrypt';

import type { ActionResult } from '@/types';

import { getUser } from '@/actions';
import { prisma } from '@/lib/prisma';

interface Input {
  password: string;
  newPassword: string;
}

export const changePassword = async ({
  password,
  newPassword,
}: Input): Promise<ActionResult<boolean>> => {
  try {
    const sessionUser = await getUser();

    if (!sessionUser) {
      return { success: false, error: 'Unauthorized' };
    }

    const user = await prisma.user.findFirst({
      where: {
        id: sessionUser.id,
      },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const isMatch = await bcrypt.compare(password, user.password!);

    if (!isMatch) {
      return { success: false, error: 'Wrong Password' };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return { success: true, data: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to change password',
    };
  }
};
