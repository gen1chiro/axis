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

export const requireAuthenticatedUser = async (): Promise<Partial<User> | null> => {
    const session = await getSession();

    if (!session) redirect('/signin');

    try {
        const result = await db.query.users.findFirst({
            where: eq(users.id, session.userId),
        })

        if (!result) return null;

        return { id: result.id, email: result.email };
    } catch (error) {
        console.error(error);
        return null;
    }
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
        const updateData: Record<string, unknown> = {}

        if (data.title !== undefined) updateData.title = data.title;
        if (data.description !== undefined) updateData.description = data.description;
        if (data.status !== undefined) updateData.status = data.status;
        if (data.priority !== undefined) updateData.priority = data.priority;
        updateData.updatedAt = new Date();

        await db.update(issues).set(updateData).where(eq(issues.id, id));
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

export const getUserIssues = async (userId: string): Promise<Issue[] | null> => {
    try {
        const userIssues = await db.query.issues.findMany({
            where: eq(users.id, userId),
            orderBy: desc(issues.createdAt),
        })

        return userIssues ?? null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
