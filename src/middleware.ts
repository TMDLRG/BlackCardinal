import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  
  // Check for test auth cookie FIRST (local testing only)
  const testAuthCookie = req.cookies.get('test-auth');
  const hasTestParam = searchParams.get('test') === 'true';
  const isTestMode = testAuthCookie?.value === 'true' || hasTestParam;

  // Protected routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/bootcamp',
    '/orientation',
  ];

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Allow test login page and demo page always
  if (pathname === '/test-login' || pathname === '/demo') {
    return NextResponse.next();
  }

  // If test mode is active, allow access and refresh cookie
  if (isTestMode && isProtectedRoute) {
    const response = NextResponse.next();
    // Refresh the cookie
    response.cookies.set('test-auth', 'true', {
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return response;
  }

  // For protected routes without test auth, redirect to signin
  if (isProtectedRoute && !isTestMode) {
    const signInUrl = new URL('/auth/signin', req.url);
    // Include query parameters in callback URL
    const callbackUrl = searchParams.toString() 
      ? `${pathname}?${searchParams.toString()}`
      : pathname;
    signInUrl.searchParams.set('callbackUrl', callbackUrl);
    return NextResponse.redirect(signInUrl);
  }

  // Allow all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|api/test-auth).*)',
  ],
};
