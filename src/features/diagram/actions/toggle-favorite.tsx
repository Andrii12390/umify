'use server';

import { revalidatePath } from 'next/cache';

import type { ActionResult } from '@/types';

import { getUser } from '@/actions';
import { PRIVATE_ROUTES } from '@/constants';
import { prisma } from '@/lib/prisma';

export const toggleFavorite = async (
  diagramId: string,
  value: boolean,
): Promise<ActionResult<void>> => {
  try {
    const user = await getUser();
    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    await prisma.diagram.update({
      where: {
        id: diagramId,
        userId: user.id,
      },
      data: {
        isFavorite: value,
      },
    });

    revalidatePath(PRIVATE_ROUTES.DIAGRAMS);

    return { success: true, data: undefined };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to toggle favorites',
    };
  }
};
