// app/middleware.js

import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Paths to protect with authentication or admin privileges
const protectedPaths = ['/api/users/profile', "/api/cart", "/api/orders"];
const adminPaths = ['/api/admin'];

// Middleware to handle authentication and authorization
export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Skip middleware for public paths
    if (!protectedPaths.some((path) => pathname.startsWith(path)) &&
        !adminPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Get token from the x-auth-token header
    const token = request.headers.get('x-auth-token');
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Verify the token
        let decoded;
        try {
            const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
            decoded = payload;
        } catch (err) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
        }
        const isAdminRoute = adminPaths.some((path) => pathname.startsWith(path));

        // Check if user has admin privileges for admin paths
        if (isAdminRoute && !decoded.user.isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Attach user data to request if needed
        const res = NextResponse.next();

        res.cookies.set('userId', decoded.user.id);
        res.cookies.set('isAdmin', decoded.user.isAdmin);

        return res;
    } catch (error) {
        console.log('2h')
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
}

export const config = {
    matcher: ['/api/:path*'],
};

export const runtime = "nodejs"
