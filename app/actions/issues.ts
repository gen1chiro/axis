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

export const createIssue = async (data: IssueData): Promise<ActionResponse> => {
    try {
        const user = await getSession()
        if (!user) {
            return {
                success: false,
                message: 'Authentication required',
                error: 'Authentication required',
            }
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

export const updateIssue = async (id: number, data: UpdateIssueData): Promise<ActionResponse> => {
    try {
        const user = await getSession()
        if (!user) {
            return {
                success: false,
                message: 'Authentication required',
                error: 'Authentication required',
            }
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
        await deleteIssueInDB(id)
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