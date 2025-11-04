'use server';

import type { Diagram } from '@/prisma-client/generated/prisma';
import type { ActionResult } from '@/types';

import { getUser } from '@/actions';
import { prisma } from '@/lib/prisma';

export async function getDiagram(id: string): Promise<ActionResult<Diagram>> {
  try {
    const user = await getUser();

    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    const newDiagram = await prisma.diagram.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!newDiagram) {
      throw new Error();
    }

    return { success: true, data: newDiagram };
  } catch {
    return { success: false, error: 'Failed to get diagram' };
  }
}
