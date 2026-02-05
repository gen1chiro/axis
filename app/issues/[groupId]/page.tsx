import { getIssueGroupById } from '@/lib/dal'
import { MdAdd } from 'react-icons/md'
import Link from 'next/link'
import IssueDisplay from '@/components/issue-display'
import IssueDisplaySkeleton from '@/components/issue-display-skeleton'
import GroupName from '@/components/group-name'
import { Suspense } from 'react'

type IssueGroupPageProps = {
    params: Promise<{ groupId: string }>
}

const IssuesGroupPage = async ({ params }: IssueGroupPageProps) => {
    const { groupId } = await params
    const { name: groupName } = await getIssueGroupById(Number(groupId))

    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            <div className='w-full flex items-center justify-between'>
                <GroupName name={groupName} groupId={Number(groupId)} />
                <Link
                    href={`/issues/${groupId}/new`}
                    className="flex items-center justify-center lg:justify-start gap-3 px-3 py-2 rounded-sm text-white text-sm bg-zinc-900 hover:bg-zinc-800 transition-colors"
                >
                    <MdAdd className="w-5 h-5" />
                    <span className="hidden lg:block">New Issue</span>
                </Link>
            </div>
            <Suspense fallback={<IssueDisplaySkeleton />}>
                <IssueDisplay groupId={Number(groupId)} />
            </Suspense>
        </div>
    )
}

export default IssuesGroupPage