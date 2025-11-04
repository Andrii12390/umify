'use server';

import { revalidatePath } from 'next/cache';

import type { Diagram } from '@/prisma-client/generated/prisma';
import type { ActionResult } from '@/types';

import { getUser } from '@/actions';
import { PRIVATE_ROUTES } from '@/constants';
import { prisma } from '@/lib/prisma';

export async function createDiagram(name: string): Promise<ActionResult<Diagram>> {
  try {
    const user = await getUser();

    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    const diagram = await prisma.diagram.create({
      data: {
        name: name.trim(),
        userId: user.id,
      },
    });

    revalidatePath(PRIVATE_ROUTES.DIAGRAMS);

    return { success: true, data: diagram };
  } catch {
    return { success: false, error: 'Failed to create diagram' };
  }
}
