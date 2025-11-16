'use server';

import type { ProfileValues } from '@/features/user/schemas';
import type { ActionResult, User } from '@/types';

import { getUser } from '@/actions';
import { PROFILE_ASSETS_FOLDER } from '@/features/user/constants';
import { prisma } from '@/lib/prisma';
import { uploadImage } from '@/utils';

export const updateUser = async (data: ProfileValues): Promise<ActionResult<User>> => {
  try {
    const user = await getUser();

    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    let imageUrl: string | null = null;

    if (data.photo instanceof File) {
      imageUrl = await uploadImage(data.photo, PROFILE_ASSETS_FOLDER);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        username: data.username,
        email: data.email,
        ...(imageUrl ? { imageUrl } : {}),
      },
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return { success: true, data: updatedUser };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update profile',
    };
  }
};
