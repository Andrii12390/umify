'use server';

import { revalidatePath } from 'next/cache';

import { getUser } from '@/actions';
import { PRIVATE_ROUTES } from '@/constants';
import { prisma } from '@/lib/prisma';

export async function updateDiagram({ id, name }: { id: string; name: string }) {
  try {
    const user = await getUser();

    if (!user) {
      return null;
    }

    const existingDiagram = await prisma.diagram.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingDiagram) {
      return null;
    }

    const diagram = await prisma.diagram.update({
      where: { id },
      data: {
        name,
      },
    });

    revalidatePath(PRIVATE_ROUTES.DIAGRAMS);

    return diagram;
  } catch {
    return null;
  }
}
