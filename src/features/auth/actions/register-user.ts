'use server';

import bcrypt from 'bcrypt';

import { generateAvatar } from '@/features/auth/utils/generate-avatar';
import { prisma } from '@/lib/prisma';

interface Payload {
  email: string;
  username: string;
  password?: string;
  imageUrl?: string;
  isVerified?: boolean;
}

export async function registerUser({
  email,
  username,
  password,
  imageUrl,
  isVerified = false,
}: Payload) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    return prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        isVerified,
        imageUrl,
        avatarColor: generateAvatar(),
      },
    });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
