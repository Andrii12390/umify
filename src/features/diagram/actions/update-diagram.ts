'use server';

import { revalidatePath } from 'next/cache';

import type { Diagram } from '@/prisma-client/generated/prisma';
import type { ActionResult } from '@/types';

import { getUser } from '@/actions';
import { PRIVATE_ROUTES } from '@/constants';
import { prisma } from '@/lib/prisma';

export async function updateDiagram({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<ActionResult<Diagram>> {
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

    const diagram = await prisma.diagram.update({
      where: { id },
      data: {
        name,
      },
    });

    revalidatePath(PRIVATE_ROUTES.DIAGRAMS);

    return { success: true, data: diagram };
  } catch {
    return { success: false, error: 'Failed to update diagram' };
  }
}
