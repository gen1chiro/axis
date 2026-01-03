import { nanoid } from 'nanoid';
import { hashPassword} from "@/lib/utils";
import { User, Issue, users, issues } from "@/db/schema";
import { db } from "@/db";
import { eq, desc } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { IssueData, UpdateIssueData } from "@/lib/schemas/issues";

// user operations
export const createUser = async (email: string, password: string): Promise<Partial<User> | null> => {
    const id = nanoid();
    const hashedPassword = await hashPassword(password);

    try {
        await db.insert(users).values({
            id,
            email,
            password: hashedPassword,
        })
        return { id, email }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const requireAuthenticatedUser = async (): Promise<Omit<User, 'password' | 'createdAt'>> => {
    const session = await getSession();

    if (!session) redirect('/signin');

    const result = await db.query.users.findFirst({
        where: eq(users.id, session.userId),
    })

    if (!result) throw new Error('User not found');

    return { id: result.id, email: result.email };
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        })

        return user ?? null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// issue operations
export const createIssue = async (data: IssueData) => {
    try {
        await db.insert(issues).values({
            title: data.title,
            description: data.description || null,
            status: data.status,
            priority: data.priority,
            userId: data.userId,
        })
    } catch (error) {
        console.error('Failed to create issue', error);
        return null;
    }
}

export const updateIssue = async (id: number, data: UpdateIssueData) => {
    try {
        await db.update(issues).set({
            ...data,
            updatedAt: new Date(),
        }).where(eq(issues.id, id));
    } catch (error) {
        console.error('Failed to update issue', error);
        return null;
    }
}

export const deleteIssue = async (id: number) => {
    try {
        await db.delete(issues).where(eq(issues.id, id));
    } catch (error) {
        console.error('Failed to delete issue', error);
        return null;
    }
}

export const getUserIssues = async (userId: string): Promise<Issue[]> => {
    try {
        const userIssues = await db.query.issues.findMany({
            where: eq(issues.userId, userId),
            orderBy: desc(issues.createdAt),
        })

        return userIssues ?? [];
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user issues');
    }
}
