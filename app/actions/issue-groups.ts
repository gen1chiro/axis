'use server';

import { ActionResponse} from "@/app/actions/auth";
import {
    createIssueGroup as createIssueGroupInDB,
    updateIssueGroup as updateIssueGroupInDB,
    deleteIssueGroup as deleteIssueGroupFromDB,
} from "@/lib/dal";
import { getSession } from "@/lib/auth";
import { updateTag } from "next/cache";

export interface GroupActionResponse extends ActionResponse {
    id?: number;
}

export const createIssueGroup = async (formData: FormData): Promise<GroupActionResponse> => {
    const user = await getSession()
    if (!user) {
        return {
            success: false,
            message: 'Authentication required',
            error: 'Authentication required',
        }
    }

    const name = formData.get('name') as string

    try {
        const result = await createIssueGroupInDB(user.userId, name)
        updateTag(`user-issue-groups-${user.userId}`)

        if (!result) {
            return {
                success: false,
                message: 'Failed to create issue group',
                error: 'Failed to create issue group',
            }
        }

        return {
            success: true,
            message: 'Issue group created successfully',
            id: result.id,
        }
    } catch (error) {
        console.error('Failed to create issue group:')
        return {
            success: false,
            message: 'Failed to create issue group',
            error: 'Failed to create issue group',
        }
    }
}

export const updateIssueGroup = async (formData: FormData, id: number): Promise<ActionResponse> => {
    const user = await getSession()
    if (!user) {
        return {
            success: false,
            message: 'Authentication required',
            error: 'Authentication required',
        }
    }

    const name = formData.get('name') as string

    try {
        const result = await updateIssueGroupInDB(id, name)
        if (!result) {
            return {
                success: false,
                message: 'Failed to update issue group',
                error: 'Failed to update issue group',
            }
        }

        return {
            success: true,
            message: 'Issue group updated successfully',
        }
    } catch (error) {
        console.error('Failed to update issue group:')
        return {
            success: false,
            message: 'Failed to update issue group',
            error: 'Failed to update issue group',
        }
    }
}

export const deleteIssueGroup = async (id: number): Promise<ActionResponse> => {
    const user = await getSession()
    if (!user) {
        return {
            success: false,
            message: 'Authentication required',
            error: 'Authentication required',
        }
    }

    try {
        const result = await deleteIssueGroupFromDB(id)
        if (!result) {
            return {
                success: false,
                message: 'Failed to delete issue group',
                error: 'Failed to delete issue group',
            }
        }

        return {
            success: true,
            message: 'Issue group deleted successfully',
        }
    } catch (error) {
        console.error('Failed to delete issue group:')
        return {
            success: false,
            message: 'Failed to delete issue group',
            error: 'Failed to delete issue group',
        }
    }
}