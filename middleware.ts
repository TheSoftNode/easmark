import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = [
    '/login', 
    '/signup', 
    '/forgot-password', 
    '/reset-password', 
    '/', 
    '/request-password-reset',
    'verify-email',
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow public routes and API routes
  if (publicRoutes.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }

  // For all other routes, redirect to login
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|[\\w-]+\\.\\w+).*)',
  ],
};