import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect /app routes
  if (request.nextUrl.pathname.startsWith('/app')) {
    // Check for basic auth
    const basicAuth = request.headers.get('authorization');
    
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');
      
      // Simple password check - change these values
      if (user === 'precise' && pwd === 'demo2025') {
        return NextResponse.next();
      }
    }
    
    // Return 401 and request basic auth
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/app/:path*',
};