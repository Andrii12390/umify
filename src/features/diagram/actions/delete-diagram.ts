'use server';

import { revalidatePath } from 'next/cache';

import { getUser } from '@/actions';
import { PRIVATE_ROUTES } from '@/constants';
import { prisma } from '@/lib/prisma';

export async function deleteDiagram(id: string) {
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

    await prisma.diagram.delete({
      where: { id },
    });

    revalidatePath(PRIVATE_ROUTES.DIAGRAMS);

    return { success: true, data: { id } };
  } catch {
    return null;
  }
}
