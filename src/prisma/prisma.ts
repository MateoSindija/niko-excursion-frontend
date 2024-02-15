import { PrismaClient } from '@prisma/client';
declare global {
  var prisma: PrismaClient | undefined; // This must be a `var` and not a `let / const`
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
