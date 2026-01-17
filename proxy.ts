import { NextResponse, NextRequest } from "next/server";
import { shouldRefreshToken, verifyJWT, generateJWT } from "@/lib/auth";

export const proxy = async (request: NextRequest) => {
    const authToken = request.cookies.get('auth_token');
    const isAuthenticated = !!authToken;

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

    const response = NextResponse.next();

    if (authToken?.value) {
        const needsRefresh = await shouldRefreshToken(authToken.value);

        if (needsRefresh) {
            const payload = await verifyJWT(authToken.value);

            if (payload) {
                const newToken = await generateJWT({ userId: payload.userId });

                response.cookies.set({
                    name: 'auth_token',
                    value: newToken,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24 * 7,
                    path: '/',
                    sameSite: 'lax'
                });
            }
        }
    }

    return response;
}

export const config = {
    matcher: [
        '/signin',
        '/signup',
        '/dashboard/:path*',
        '/issues/:path*'
    ],
}