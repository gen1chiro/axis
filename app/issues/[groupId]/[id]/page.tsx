import { getIssueById } from "@/lib/dal";
import Link from "next/link";
import PriorityPill from "@/components/priority-pill";
import StatusPill from "@/components/status-pill";
import { FiEdit2 } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { formatRelativeTime } from "@/lib/utils";
import UserEmail from "@/components/user-email";
import { Suspense } from "react";
import DeleteButton from "@/components/delete-button";
import DotsLoader from "@/components/dots-loader";
import IssuePageSkeleton from "@/components/issue-page-skeleton";

type IssuePageProps = {
    params: Promise<{ groupId: string, id: string }>;
}

const IssueContent = async ({ params }: IssuePageProps) => {
    const { groupId, id } = await params;
    const issue = await getIssueById(id);
    const {
        id: issueId,
        title,
        description,
        createdAt,
        updatedAt,
        status,
        priority
    } = issue;

    return (
        <div className="w-full max-w-4xl flex flex-col justify-center items-start gap-5 mt-6">
            <Link href={`/issues/${groupId}`}
                  className="flex items-center justify-center gap-1 decoration-dotted hover:underline">
                <IoIosArrowBack className="text-lg text-purple-400"/>
                <span className="text-sm text-body">BACK TO ISSUES</span>
            </Link>

            <div className="w-full flex items-start justify-between">
                <h1 className="text-3xl font-semibold capitalize text-heading">{title}</h1>
                <div className="flex gap-3">
                    <Link
                        href={`/issues/${groupId}/${id}/edit`}
                        className="flex items-center gap-2 p-2 bg-white text-xs text-heading rounded-sm hover:bg-stone-100 transition-colors"
                    >
                        <FiEdit2 className="w-4 h-4" />
                    </Link>
                    <DeleteButton issueID={issueId} />
                </div>
            </div>

            <div className="w-full bg-stone-200 border border-stone-300 rounded-md p-4 text-heading text-sm">
                <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-2 text-xs text-stone-500 text-body mb-4">
                    <div className="flex items-center gap-2">
                        <StatusPill status={status} />
                        <PriorityPill priority={priority} />
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Created {formatRelativeTime(createdAt)}</span>
                        <span>Updated {formatRelativeTime(updatedAt)}</span>
                    </div>
                </div>
                <p className={description ?? 'text-stone-400'}>{description ?? 'No description provided'}</p>
            </div>

            <div className="w-full bg-stone-200 border border-stone-300 rounded-md p-4 text-heading text-sm z-10">
                <h2 className="text-lg font-semibold mb-4 text-heading">Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <p className="text-xs text-body text-stone-500 mb-2">Assigned to</p>
                        <Suspense fallback={<DotsLoader />}>
                            <UserEmail className='text-heading text-sm' />
                        </Suspense>
                    </div>
                    <div>
                        <p className="text-xs text-body text-stone-500 mb-2">Status</p>
                        <StatusPill status={status} />
                    </div>
                    <div>
                        <p className="text-xs text-body text-stone-500 mb-2">Priority</p>
                        <PriorityPill priority={priority} />
                    </div>
                    <div>
                        <p className="text-xs text-body text-stone-500 mb-2">Created</p>
                        <p className="text-black">{formatRelativeTime(createdAt)}</p>
                    </div>
                </div>
            </div>

            <div
                className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(120, 113, 108, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '12px 12px',
                    maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)'
                }}
            />
        </div>
    );
}

const IssuePage = async ({ params }: IssuePageProps) => {
    return (
        <div className="w-full min-h-dvh bg-background flex items-start justify-center p-4">
            <Suspense fallback={<IssuePageSkeleton />}>
                <IssueContent params={params} />
            </Suspense>
        </div>
    );
}

export default IssuePage;