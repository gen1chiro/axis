import { Issue } from "@/db/schema";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";
import StatusPill from "@/components/status-pill";
import PriorityPill from "@/components/priority-pill";

type IssueTileProps = {
    issue: Issue;
}

const IssueTile = ({ issue }: IssueTileProps) => {
    const {
        id,
        title,
        createdAt,
        status,
        priority,
        groupId
    } = issue;
    const relativeDate = formatRelativeTime(createdAt);

    return (
        <Link
            href={`/issues/${groupId}/${id}`}
            className='w-full p-2 text-sm border-b border-dotted border-stone-300 hover:bg-stone-300 transition-colors ease-in-out grid grid-cols-6 lg:grid-cols-12 gap-4 justify-items-center items-center'>
            <h1 className='text-heading font-semibold capitalize col-span-4 lg:col-span-6 w-full text-left'>{title}</h1>
            <div className='hidden lg:block col-span-2'>
                <StatusPill status={status} />
            </div>
            <div className='hidden lg:block col-span-2'>
                <PriorityPill priority={priority} />
            </div>
            <p className='text-heading text-xs col-span-2 w-full text-right'>{relativeDate}</p>
        </Link>
    )
}

export default IssueTile;