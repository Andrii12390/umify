'use server';

import { revalidatePath } from 'next/cache';

import type { Diagram } from '@/prisma-client/generated/prisma';
import type { ActionResult } from '@/types';

import { getUser } from '@/actions';
import { PRIVATE_ROUTES } from '@/constants';
import { prisma } from '@/lib/prisma';

export async function deleteDiagram(id: string): Promise<ActionResult<Diagram>> {
  try {
    const user = await getUser();

    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    const existingDiagram = await prisma.diagram.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingDiagram) {
      return { success: false, error: 'Diagram not found' };
    }

    const deletedDiagram = await prisma.diagram.delete({
      where: { id },
    });

    revalidatePath(PRIVATE_ROUTES.DIAGRAMS);

    return { success: true, data: deletedDiagram };
  } catch {
    return { success: false, error: 'Failed to delete diagram' };
  }
}
