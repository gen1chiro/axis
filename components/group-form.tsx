'use client'

import { useCreateIssueGroup } from '@/hooks/useCreateIssueGroup'

const GroupForm = () => {
    const { formAction, isPending } = useCreateIssueGroup()

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