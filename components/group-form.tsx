'use client'

import { useCreateIssueGroup } from '@/hooks/useCreateIssueGroup'
import { MdAdd } from 'react-icons/md'
import React from "react";

const GroupForm = () => {
    const { formAction, isPending } = useCreateIssueGroup()

    return (
        <div className='w-full sm:w-auto'>
            <form
                action={ formAction }
                className='w-full flex items-center justify-center gap-2'
            >
                <input
                    type='text'
                    id='name'
                    name='name'
                    className='w-full sm:w-64 text-heading text-sm px-2 py-1 bg-stone-100 rounded-sm border border-stone-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                />
                <button
                    type='submit'
                    className="flex items-center justify-center lg:justify-start gap-3 text-heading px-2 lg:px-3 py-1 rounded-sm text-white text-sm bg-zinc-900 hover:bg-zinc-800 transition-colors"
                >
                    <MdAdd className="w-4 h-4" />
                    <span className='hidden sm:inline'>Create</span>
                </button>
            </form>
        </div>
    )
}

export default GroupForm