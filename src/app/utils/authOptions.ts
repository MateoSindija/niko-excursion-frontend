import CredentialsProvider from 'next-auth/providers/credentials';
import firebase, { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { NextAuthOptions } from 'next-auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
export const authOptions: NextAuthOptions = {
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
      authorize: async (credentials) => {
        if (credentials) {
          try {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              credentials.email,
              credentials.password,
            );
            if (userCredential.user) {
              return {
                id: userCredential.user.uid,
                email: userCredential.user.email,
              };
            }
            return null;
          } catch (e) {
            console.log(e);
          }
        }
        return null;
      },
    }),
  ],
};
