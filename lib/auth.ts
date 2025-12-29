import { cookies } from 'next/headers';
import * as jose from 'jose';

interface JWTPayload {
    userId: string;
    [key: string]: string | number | boolean | object | null | undefined;
}

const JWT_EXPIRATION = '7d';
const REFRESH_THRESHOLD = 60 * 60 * 24;

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET
);

const generateJWT = async (payload: JWTPayload): Promise<string> => {
    return await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(JWT_EXPIRATION)
        .sign(JWT_SECRET)
}

const verifyJWT = async (token: string): Promise<JWTPayload | null> => {
    try {
        const { payload } = await jose.jwtVerify(token, JWT_SECRET);
        return payload as JWTPayload;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const shouldRefreshToken = async (token: string) => {
    try {
        const { payload } = await jose.jwtVerify(token, JWT_SECRET);
        const exp = payload.exp;
        if (!exp) return false;
        const now = Math.floor(Date.now() / 1000);

        return exp - now < REFRESH_THRESHOLD;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const createSession = async (userId: string) => {
    try {
        const token = await generateJWT({ userId });
        const cookieStore = await cookies();

        cookieStore.set({
            name: 'auth_token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            sameSite: 'lax'
        });

        return true
    } catch (error) {
        console.error('Error creating session:', error);
        return false
    }
}

export const getSession = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) return null;

        const needsRefresh = await shouldRefreshToken(token);
        if (needsRefresh) {
            try {
                const payload = await verifyJWT(token);
                if(!payload) return null;

                const newToken = await generateJWT({ userId: payload.userId });

                cookieStore.set({
                    name: 'auth_token',
                    value: newToken,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24 * 7,
                    path: '/',
                    sameSite: 'lax'
                });

                return { userId: payload.userId };
            } catch (error) {
                console.error('Error refreshing token:', error);
                return null;
            }
        }

        const payload = await verifyJWT(token);
        if (!payload) return null;
        return { userId: payload.userId };
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes('During prerendering, `cookies()` rejects')
        ) {
            console.log(
                'Cookies not available during prerendering, returning null session'
            )
            return null
        }

        console.error('Error getting session:', error);
        return null;
    }
}

export const destroySession = async () => {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('auth_token');
    } catch (error) {
        console.error('Error destroying session:', error);
    }
}