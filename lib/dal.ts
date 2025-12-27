import { nanoid } from 'nanoid';
import { hashPassword} from "@/lib/utils";
import { User, Issue, users, issues } from "@/db/schema";
import { db } from "@/db";
import { eq, desc } from "drizzle-orm";

//TODO
// createIssue
// updateIssue
// deleteIssue

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
