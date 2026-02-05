import { getIssuesByGroupId } from "@/lib/dal";
import IssueTile from "@/components/issue-tile";

type IssueDisplayProps = {
    groupId: number;
}

const IssueDisplay = async ({ groupId }: IssueDisplayProps) => {
    const issues = await getIssuesByGroupId(groupId);

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
                        <IssueTile key={issue.id} issue={issue} />
                    ))
                }
            </div>
        ) : (
            <div className='w-full flex justify-center items-center bg-stone-200 rounded-md py-20'>
                <div className='flex flex-col items-center justify-center gap-3'>
                    <h1 className='text-heading text-lg md:text-2xl'>No issues here!</h1>
                    <p className='text-body text-xs md:text-sm'>Get started by creating one.</p>
                </div>
            </div>
        )
}

export default IssueDisplay;