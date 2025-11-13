'use server';

import type { DiagramData } from '@/features/uml/schemas';
import type { ActionResult } from '@/types';

import { getUser } from '@/actions';
import { diagramDataSchema } from '@/features/uml/schemas';
import { prisma } from '@/lib/prisma';

export async function getDiagram(id: string): Promise<ActionResult<DiagramData | null>> {
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

    const validationResult = diagramDataSchema.safeParse(JSON.parse(diagram.data as string));

    return { success: true, data: validationResult.success ? validationResult.data : null };
  } catch {
    return { success: false, error: 'Failed to get diagram' };
  }
}
