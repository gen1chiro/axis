'use server';

import {
    IssueSchema,
    UpdateIssueSchema,
    IssueData,
    UpdateIssueData
} from "@/lib/schemas/issues";
import { ActionResponse } from "@/app/actions/auth";
import {
    createIssue as saveIssueToDB,
    updateIssue as updateIssueInDB,
    deleteIssue as deleteIssueInDB,
} from "@/lib/dal";
import { getSession } from "@/lib/auth";
import { revalidateTag } from "next/cache";

export const createIssue = async (formData: FormData): Promise<ActionResponse> => {
    try {
        const user = await getSession()
        if (!user) {
            return {
                success: false,
                message: 'Authentication required',
                error: 'Authentication required',
            }
        }

        const data: IssueData = {
            title: formData.get('title') as string,
            description: formData.get('description') as string || undefined,
            status: formData.get('status') as 'backlog' | 'todo' | 'in_progress' | 'done',
            priority: formData.get('priority') as 'low' | 'medium' | 'high',
            userId: user.userId,
        }

        const validationResult = IssueSchema.safeParse(data);
        if (!validationResult.success) {
            return {
                success: false,
                message: 'Validation errors occurred',
                errors: validationResult.error.flatten().fieldErrors,
            }
        }

        await saveIssueToDB(validationResult.data)

        revalidateTag(`user-issues-${user.userId}`, 'max');

        return {
            success: true,
            message: 'Issue created successfully',
        }
    } catch (error) {
        console.error('Error creating issue:', error);
        return {
            success: false,
            message: 'Failed to create new issue',
            error: 'Failed to create new issue',
        }
    }
}

export const updateIssue = async (id: number, formData: FormData): Promise<ActionResponse> => {
    try {
        const user = await getSession()
        if (!user) {
            return {
                success: false,
                message: 'Authentication required',
                error: 'Authentication required',
            }
        }

        const data: UpdateIssueData = {
            title: formData.get('title') as string,
            description: formData.get('description') as string || undefined,
            status: formData.get('status') as 'backlog' | 'todo' | 'in_progress' | 'done',
            priority: formData.get('priority') as 'low' | 'medium' | 'high',
        }

        const validationResult = UpdateIssueSchema.safeParse(data);
        if (!validationResult.success) {
            return {
                success: false,
                message: 'Validation errors occurred',
                errors: validationResult.error.flatten().fieldErrors,
            }
        }

        await updateIssueInDB(id, validationResult.data)

        revalidateTag(`issue-${id}`, 'max');
        revalidateTag(`user-issues-${user.userId}`, 'max');

        return {
            success: true,
            message: 'Issue updated successfully',
        }
    } catch (error) {
        console.error('Error updating issue:', error);
        return {
            success: false,
            message: 'Failed to update issue',
            error: 'Failed to update issue',
        }
    }
}

export const deleteIssue = async (id: number): Promise<ActionResponse> => {
    try {
        const user = await getSession()
        if (!user) {
            return {
                success: false,
                message: 'Authentication required',
                error: 'Authentication required',
            }
        }

        await deleteIssueInDB(id)

        revalidateTag(`issue-${id}`, 'max');
        revalidateTag(`user-issues-${user.userId}`, 'max');

        return {
            success: true,
            message: 'Issue deleted successfully',
        }
    } catch (error) {
        console.error('Error deleting issue:', error);
        return {
            success: false,
            message: 'Failed to delete issue',
            error: 'Failed to delete issue',
        }
    }
}