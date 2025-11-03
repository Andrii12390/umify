'use server';

import { revalidatePath } from 'next/cache';

import { getUser } from '@/actions';
import { PRIVATE_ROUTES } from '@/constants';
import { prisma } from '@/lib/prisma';

export async function createDiagram(name: string) {
  try {
    const user = await getUser();

    if (!user) {
      return null;
    }

    const diagram = await prisma.diagram.create({
      data: {
        name: name.trim(),
        userId: user.id,
      },
    });

    revalidatePath(PRIVATE_ROUTES.DIAGRAMS);

    return diagram;
  } catch {
    return null;
  }
}
