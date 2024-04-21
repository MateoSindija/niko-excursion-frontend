import CredentialsProvider from 'next-auth/providers/credentials';
import firebase, { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import app, { firebaseConfig, auth } from '@/firebase/config';
import {
  getAuth,
  signInWithEmailAndPassword,
  updateCurrentUser,
} from '@firebase/auth';
import { NextAuthOptions } from 'next-auth';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';

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
  adapter: FirestoreAdapter(app),
};
