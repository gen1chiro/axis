import { requireAuthenticatedUser, getUserIssues } from "@/lib/dal";
import {MdAdd} from "react-icons/md";
import Link from "next/link";
import React from "react";

const IssueDisplay = async () => {
    const user = await requireAuthenticatedUser();
    const issues = await getUserIssues(user.id!);

    return issues.length > 0
        ? (
            <div className='w-full'>

            </div>
        ) : (
            <div className='w-full flex justify-center items-center bg-stone-200 rounded-md py-20'>
                <div className='flex flex-col items-center justify-center gap-3'>
                    <h1 className='text-heading text-lg md:text-2xl'>No issues here!</h1>
                    <p className='text-body text-xs md:text-sm'>Get started by creating one.</p>
                    <Link
                        href="/issues/new"
                        className="flex items-center justify-center lg:justify-start text-heading gap-3 px-2 py-1 md:px-3 md:py-2 rounded-sm text-white text-xs md:text-sm bg-zinc-900 hover:bg-zinc-800 transition-colors"
                    >
                        <MdAdd className="w-4 h-4" />
                        <span>Create Issue</span>
                    </Link>
                </div>
            </div>
        )
}

export default IssueDisplay;