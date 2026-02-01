'use client'

import { MdAdd } from 'react-icons/md'
import React, { useState } from 'react'
import { useCreateIssueGroup } from '@/hooks/useCreateIssueGroup'

const NavButton = () => {
    const [isAdding, setIsAdding] = useState(false)
    const { formAction, isPending } = useCreateIssueGroup()

    const handleClick = () => {
        setIsAdding(prevState => !prevState)
    }

    return (
        <div className='w-full hover:bg-stone-300 transition-colors rounded-sm'>
            <button
                onClick={ handleClick }
                className="w-full hidden lg:flex items-center justify-center lg:justify-start gap-3 lg:px-3 py-2"
            >
                <MdAdd className="w-5 h-5" />
                <span>New Group</span>
            </button>
            {
                isAdding && (
                    <form action={formAction} className='w-full px-3 pyt-1 pb-2'>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            required
                            className='w-full text-heading text-sm px-2 bg-stone-100 border rounded-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                        />
                    </form>
                )
            }
        </div>
    )
}

export default NavButton