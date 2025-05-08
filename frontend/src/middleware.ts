import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Constants for protected routes and login route
const PROTECTED_ROUTES = ['/dashboard', '/employee', '/records', '/projects'];
const LOGIN_ROUTE = '/login';

// Helper function to validate the token
async function validateToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/validate-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error('Token validation failed: Invalid token');
      return false;
    }

    const data = await res.json();
    return data.isValid || false; // Ensure fallback to false if isValid is undefined
  } catch (error) {
    console.error('Token validation failed:', error);
    return false;
  }
}

// Middleware function to handle authentication logic
export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value; // Retrieve the token from cookies

  // Validate token if it exists
  const isValidToken = token ? await validateToken(token) : false;

  console.log(isValidToken);

  // Redirect authenticated users away from the login page
  if (req.nextUrl.pathname === LOGIN_ROUTE && isValidToken) {
    return NextResponse.redirect(new URL('/dashboard', req.url)); // Redirect to dashboard if authenticated
  }

  // Protect routes that require authentication
  if (PROTECTED_ROUTES.includes(req.nextUrl.pathname) && !isValidToken) {
    // Create the response to redirect to login and clear the invalid token
    const response = NextResponse.redirect(new URL(LOGIN_ROUTE, req.url));

    // Clear the token cookie if the user is not authenticated
    req.cookies.delete('token');

    return response; // Redirect to login
  }

  return NextResponse.next(); // Allow access if token is valid or if no restrictions are violated
}

// Config to apply the middleware only to the specified routes
export const config = {
  matcher: ['/dashboard', '/login', '/employee', '/records', '/projects'], // Define which routes to apply middleware to
};
