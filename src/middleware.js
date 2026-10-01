import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/admin-token';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Publicly accessible admin login page
  if (pathname === '/admin/login') {
    const token = request.cookies.get('softtap_admin_token')?.value;
    if (token) {
      const payload = await verifyAdminToken(token);
      if (payload && payload.role === 'admin') {
        // Already logged in as admin, redirect to admin dashboard
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
    return NextResponse.next();
  }

  // Strictly protect all other /admin paths
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('softtap_admin_token')?.value;

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifyAdminToken(token);

    if (!payload || payload.role !== 'admin') {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
