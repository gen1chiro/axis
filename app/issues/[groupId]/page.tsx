import { getIssuesByGroupId } from '@/lib/dal'
import { MdAdd } from 'react-icons/md'
import Link from 'next/link'
import React from "react";

type IssueGroupPageProps = {
    params: Promise<{ groupId: string }>;
}

const IssuesGroupPage = async ({ params }: IssueGroupPageProps) => {
    const { groupId } = await params
    const issues = await getIssuesByGroupId(Number(groupId))

    return (
        <div>
            <div>Issues Group Page</div>
            {
                issues.length > 0
                    ? (
                        issues.map((issue) => {
                            return (
                                <Link key={issue.id} href={`/issues/${groupId}/${issue.id}`}>
                                    {issue.title}
                                </Link>
                            )
                        })
                    )
                    : (
                        <div>No issues found in this group.</div>
                    )
            }
            <Link
                href={`/issues/${groupId}/new`}
                className="flex items-center justify-center lg:justify-start gap-3 lg:px-3 py-2 rounded-sm hover:bg-stone-300 transition-colors"
            >
                <MdAdd className="w-5 h-5" />
                <span className="hidden lg:block">New Issue</span>
            </Link>
        </div>
    )
}

export default IssuesGroupPage