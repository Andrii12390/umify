import type { User as PrismaUser } from '@/prisma-client/generated/prisma';

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message: string;
  status: number;
};

export type User = Pick<
  PrismaUser,
  'id' | 'username' | 'email' | 'imageUrl' | 'avatarColor' | 'isVerified'
>;
