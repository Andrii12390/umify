'use server';

import type { Diagram } from '@/prisma-client/generated/prisma';
import type { ActionResult } from '@/types';

import { getUser } from '@/actions';
import { prisma } from '@/lib/prisma';

export async function getDiagrams(): Promise<ActionResult<Diagram[]>> {
  try {
    const user = await getUser();

    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    const diagrams = await prisma.diagram.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return { success: true, data: diagrams };
  } catch {
    return { success: false, error: 'Failed to get diagrams' };
  }
}
