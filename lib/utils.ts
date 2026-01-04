import { compare, hash } from 'bcrypt';
import { formatDistanceToNow } from 'date-fns';

export async function hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword);
}

export const formatRelativeTime = (date: Date | string): string => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return formatDistanceToNow(parsedDate, { addSuffix: true });
}