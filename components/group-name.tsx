'use client'

import { updateIssueGroup } from '@/app/actions/issue-groups'
import { ActionResponse } from '@/app/actions/auth'
import { useActionState, useState } from 'react'


type GroupNameProps = {
    name: string
    groupId: number
}

const initialState: ActionResponse = {
    success: false,
    message: '',
    errors: undefined,
}

const GroupName = ({ name, groupId }: GroupNameProps) => {
    const [isEditing, setIsEditing] = useState(false)

    const [_, formAction] = useActionState<ActionResponse, FormData>(
        async (_, formData) => {
            try {
                setIsEditing(false)
                return await updateIssueGroup(formData, groupId)
            } catch (error) {
                return {
                    success: false,
                    message: (error as Error).message || 'An error occurred',
                    error: undefined,
                }
            }
        }, initialState
    )

    const handleDoubleClick = () => {
        setIsEditing(true)
    }

    const handleBlur = () => {
        setIsEditing(false)
    }

    return (
        isEditing
            ? (
                <form action={formAction}>
                    <input
                        type='text'
                        name='name'
                        defaultValue={ name }
                        autoFocus
                        onBlur={ handleBlur }
                        className='text-heading text-lg px-2 bg-stone-100 border rounded-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                    />
                </form>
            )
            : (
                <h1 className='text-heading text-lg' onDoubleClick={ handleDoubleClick }>{ name }</h1>
            )
    )
}

export default GroupName
