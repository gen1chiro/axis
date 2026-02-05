import { requireAuthenticatedUser, getUserIssueGroups } from '@/lib/dal'
import Link from 'next/link'
import { formatRelativeTime } from "@/lib/utils"

const GroupDisplay = async () => {
    const user = await requireAuthenticatedUser()
    const groups = await getUserIssueGroups(user.id)

    return (
        groups.length > 0
            ? (
                groups.map(group => (
                    <Link
                        key={group.id}
                        href={`/issues/${group.id}`}
                        className='w-full p-2 text-sm border-b border-dotted border-stone-300 hover:bg-stone-300 transition-colors ease-in-out grid grid-cols-6 md:grid-cols-12 gap-4 justify-items-center items-center'>
                        <h1 className='text-heading font-semibold capitalize col-span-4 md:col-span-8 w-full text-left'>{group.name}</h1>
                        <p className='hidden md:block col-span-2'>{formatRelativeTime(group.updatedAt)}</p>
                        <p className='col-span-2 w-full text-right'>{formatRelativeTime(group.createdAt)}</p>
                    </Link>
                ))
            )
            : (
                <div className='w-full p-2 text-sm border-b border-dotted border-stone-300 hover:bg-stone-300 transition-colors ease-in-out grid grid-cols-6 md:grid-cols-12 gap-4 justify-items-center items-center text-stone-400'>
                    <p className='col-span-4 md:col-span-8 w-full text-left'>-</p>
                    <p className='hidden md:block col-span-2'>-</p>
                    <p className='col-span-2 w-full text-right'>-</p>
                </div>
            )
    )
}

export default GroupDisplay