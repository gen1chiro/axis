import { requireAuthenticatedUser, getUserIssueGroups } from "@/lib/dal";
import { MdAdd } from "react-icons/md";
import Link from "next/link";
import IssueTile from "@/components/issue-tile";

const IssueDisplay = async () => {
    const user = await requireAuthenticatedUser();
    const issues = await getUserIssueGroups(user.id);

    return issues.length > 0
        ? (
            <div className='w-full bg-stone-200 border border-stone-300 rounded-sm flex flex-col px-2 pt-1 pb-4'>
                <div className='grid grid-cols-6 lg:grid-cols-12 gap-4 text-body p-2 text-xs text-stone-500 justify-items-center items-center'>
                    <h1 className='col-span-4 lg:col-span-6 w-full text-left'>Title</h1>
                    <h1 className='hidden lg:block col-span-2'>Status</h1>
                    <h1 className='hidden lg:block col-span-2'>Priority</h1>
                    <h1 className='col-span-2 w-full text-right'>Created</h1>
                </div>
                {
                    issues.map(issue => (
                        // <IssueTile key={issue.id} issue={issue} />
                        <Link key={issue.id} href={`/issues/${issue.id}`}>{issue.name}</Link>
                    ))
                }
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