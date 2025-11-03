'use server';

import { getUser } from '@/actions';
import { prisma } from '@/lib/prisma';

export async function getDiagrams() {
  try {
    const user = await getUser();

    if (!user) {
      return null;
    }

    return prisma.diagram.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  } catch {
    return null;
  }
}
