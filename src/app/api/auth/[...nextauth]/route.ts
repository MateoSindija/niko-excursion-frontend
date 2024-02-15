import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import prisma from '@/prisma/prisma';

export const handler: NextAuthOptions = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/admin',
    signOut: '/admin',
  },
  providers: [
    CredentialsProvider({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (credentials) {
          const user = await prisma?.user.findFirst({
            where: { email: credentials.email },
          });
          if (user) {
            const passwordCorrect = await compare(
              credentials.password,
              user.password,
            );
            if (passwordCorrect) {
              return { id: user.id, email: user.email };
            }
            return null;
          }
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
