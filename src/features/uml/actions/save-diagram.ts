'use server';

import type { JsonValue } from '@/prisma-client/generated/prisma/runtime/library';
import type { ActionResult } from '@/types';

import { getUser } from '@/actions';
import { prisma } from '@/lib/prisma';

export async function saveDiagram(id: string, data: string): Promise<ActionResult<JsonValue>> {
  try {
    const user = await getUser();

    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    const diagram = await prisma.diagram.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!diagram) {
      throw new Error();
    }

    const updatedDiagram = await prisma.diagram.update({
      where: {
        id,
        userId: user.id,
      },
      data: {
        data,
      },
    });

    return { success: true, data: updatedDiagram.data };
  } catch {
    return { success: false, error: 'Failed to get diagram' };
  }
}
