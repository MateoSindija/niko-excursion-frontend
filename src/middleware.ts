import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { i18n } from 'i18n.config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from 'next-firebase-auth-edge';
import { authConfig } from '@/app/utils/authServerConfig';

const PUBLIC_PATHS = [
  '/admin',
  '/',
  '/hr',
  '/en',
  '/hr/about-us',
  '/en/about-us',
  '/hr/contact',
  '/en/contact',
  '/hr/tours',
  '/en/tours',
  '/en/tours/*',
  '/hr/tours/*',
];

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: authConfig.apiKey,
    cookieName: authConfig.cookieName,
    cookieSerializeOptions: authConfig.cookieSerializeOptions,
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
    serviceAccount: authConfig.serviceAccount,
    // handleInvalidToken: async (reason) => {
    //   console.info('Missing or malformed credentials', { reason });
    //
    //   return redirectToLogin(request, {
    //     path: '/admin',
    //     publicPaths: PUBLIC_PATHS,
    //   });
    // },
    handleError: async (error) => {
      console.error('Unhandled authentication error', { error });
      return redirectToLogin(request, {
        path: '/admin',
        publicPaths: PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/',
    '/api/login',
    '/api/logout',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
