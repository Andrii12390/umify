'use server';

import bcrypt from 'bcrypt';

import type { ActionResult, User } from '@/types';

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
}: Payload): Promise<ActionResult<User>> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return { success: false, error: 'User with this email already exists' };
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        isVerified,
        imageUrl,
        avatarColor: generateAvatar(),
      },
    });

    return { success: true, data: user };
  } catch {
    return { success: false, error: 'Registration failed' };
  }
}
