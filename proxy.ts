import { NextResponse, NextRequest } from "next/server";

export const proxy = async (request: NextRequest) => {
    const isAuthenticated = request.cookies.get('auth_token');

    if (
        (
            request.nextUrl.pathname.startsWith('/signin')
            || request.nextUrl.pathname.startsWith('/signup')

        )
        && isAuthenticated
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (
        (
            request.nextUrl.pathname.startsWith('/dashboard')
            || request.nextUrl.pathname.startsWith('/issues')
        )
        && !isAuthenticated
    ) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/signin',
        '/signup',
        '/dashboard/:path*',
        '/issues/:path*'
    ],
}