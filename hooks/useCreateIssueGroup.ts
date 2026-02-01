'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { createIssueGroup } from '@/app/actions/issue-groups'
import { ActionResponse } from '@/app/actions/auth'

const initialState: ActionResponse = {
    success: false,
    message: '',
    errors: undefined,
}

export const useCreateIssueGroup = () => {
    const router = useRouter()

    const [state, formAction, isPending] = useActionState<ActionResponse, FormData>(
        async (_, formData) => {
            try {
                const result = await createIssueGroup(formData)

                if (result.success) {
                    router.push(`/issues/${result.id}`)
                }

                return result
            } catch (error) {
                return {
                    success: false,
                    message: (error as Error).message || 'An error occurred',
                    errors: undefined,
                }
            }
        },
        initialState
    )

    return { state, formAction, isPending }
}

