'use server';

import { getUser } from '@/actions';
import { prisma } from '@/lib/prisma';

export async function getDiagram(id: string) {
  try {
    const user = await getUser();

    if (!user) {
      return null;
    }

    return prisma.diagram.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });
  } catch {
    return null;
  }
}
