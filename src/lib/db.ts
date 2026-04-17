import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Deprecated: the old sqlite functions are no longer needed
// but we keep a dummy export if any other file imports it by accident, 
// though we will update the known routes.
export async function initDb() {
  return prisma;
}
