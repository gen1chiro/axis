import { MdAdd } from "react-icons/md";
import Link from "next/link";
import React, { Suspense } from "react";
import IssueDisplay from "@/components/issue-display";
import IssueDisplaySkeleton from "@/components/issue-display-skeleton";

const DashboardPage =  () => {
    return (
        <div className='w-full flex flex-col items-center justify-center gap-8 py-4 px-8'>
            <div className='w-full flex items-center justify-between'>
                <h1 className='text-heading font-semibold text-2xl text-center'>Issues</h1>
                <Link
                    href="/issues/new"
                    className="flex items-center justify-center lg:justify-start gap-3 text-heading px-2 lg:px-3 py-2 rounded-sm text-white text-sm bg-zinc-900 hover:bg-zinc-800 transition-colors"
                >
                    <MdAdd className="w-4 h-4" />
                    <span className='hidden lg:block'>New Issue</span>
                </Link>
            </div>
            <Suspense fallback={<IssueDisplaySkeleton />}>
                <IssueDisplay/>
            </Suspense>
        </div>
    )
}

export default DashboardPage;