import { nanoid } from 'nanoid';
import { hashPassword} from "@/lib/utils";
import { User, IssueGroup, Issue, users, issues, issueGroups } from "@/db/schema";
import { db } from "@/db";
import { eq, asc } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { IssueData, UpdateIssueData } from "@/lib/schemas/issues";
import { cache } from "react";
import { cacheTag } from "next/cache";

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

export const requireAuthenticatedUser = cache(async (): Promise<Omit<User, 'password' | 'createdAt'>> => {
    const session = await getSession();

    if (!session) throw new Error('No session found');

    const result = await db.query.users.findFirst({
        where: eq(users.id, session.userId),
    })

    if (!result) throw new Error('User not found');

    return { id: result.id, email: result.email };
});

export const getUserByEmail = cache(async (email: string): Promise<User | null> => {
    try {
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        })

        return user ?? null;
    } catch (error) {
        console.error(error);
        return null;
    }
})

// issue operations
export const createIssue = async (data: IssueData) => {
    try {
        await db.insert(issues).values({
            title: data.title,
            description: data.description || null,
            status: data.status,
            priority: data.priority,
            groupId: data.groupId,
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

export const getIssueById = async (issueId: string): Promise<Issue> => {
    'use cache';
    cacheTag(`issue-${issueId}`);

    try {
        const issue = await db.query.issues.findFirst({
            where: eq(issues.id, Number(issueId)),
        })

        if (!issue) throw new Error('Issue not found');

        return issue;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch issue');
    }
};

// issue group operations

export const createIssueGroup = async (userId: string, name: string): Promise<Partial<IssueGroup> | null> => {
    try {
        const [{ id }] = await db.insert(issueGroups).values({
            userId,
            name,
        }).returning({ id: issueGroups.id })
        return { id, userId, name };
    } catch (error) {
        console.error('Failed to create issue group', error);
        return null;
    }
}

export const deleteIssueGroup = async (id: number) => {
    try {
        await db.delete(issueGroups).where(eq(issueGroups.id, id));
    } catch (error) {
        console.error('Failed to delete issue group', error);
        return null;
    }
}

export const updateIssueGroup = async (id: number, name: string) => {
    try {
        await db.update(issueGroups).set({
            name,
            updatedAt: new Date(),
        }).where(eq(issueGroups.id, id));
    } catch (error) {
        console.error('Failed to update issue group', error);
        return null;
    }
}

export const getUserIssueGroups = async (userId: string): Promise<IssueGroup[]> => {
    'use cache';
    cacheTag(`user-issues-${userId}`);

    try {
        const userIssueGroups = await db.query.issueGroups.findMany({
            where: eq(issueGroups.userId, userId),
            orderBy: asc(issueGroups.createdAt),
        })

        return userIssueGroups ?? [];
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user issues');
    }
};

export const getIssueGroupById = async (groupId: number): Promise<IssueGroup> => {
    try {
        const issueGroup = await db.query.issueGroups.findFirst({
            where: eq(issueGroups.id, groupId),
        })

        if (!issueGroup) throw new Error('Issue group not found')

        return issueGroup
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch issue group');
    }
}

export const getIssuesByGroupId = async (groupId: number): Promise<Issue[]> => {
    try {
        const issuesInGroup = await db.query.issues.findMany({
            where: eq(issues.groupId, groupId),
            orderBy: asc(issues.createdAt),
        })

        return issuesInGroup ?? [];
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch issues in group');
    }
}