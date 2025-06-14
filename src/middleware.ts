import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect /studio route in production (optional)
  if (request.nextUrl.pathname.startsWith('/studio')) {
    // Option 1: Restrict to specific domains/IPs
    // Option 2: Add basic auth
    // Option 3: Leave open (default) - Sanity handles auth
    
    // For now, we'll leave it open as Sanity has its own auth
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/studio/:path*',
};