'use client'

import { useActionState } from 'react'
import { createIssueGroup } from '@/app/actions/issue-groups'
import { ActionResponse } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'

const initialState: ActionResponse = {
    success: false,
    message: '',
    errors: undefined,
}

const GroupForm = () => {
    const router = useRouter()

    const [state, formAction, isPending] = useActionState<ActionResponse, FormData>
    (
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
        }, initialState
    )

    return (
        <div>
            <form action={ formAction }>
                <input type='text' id='name' name='name' className='border border-black'/>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default GroupForm