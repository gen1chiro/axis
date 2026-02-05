'use client'

import { useParams, useRouter } from 'next/navigation'
import { MdDeleteOutline } from 'react-icons/md'
import { deleteIssueGroup } from '@/app/actions/issue-groups'
import Spinner from '@/components/spinner'
import { useTransition } from 'react'
import Link from 'next/link'

type NavLinkProps = {
    id: number
    name: string
}

const NavLink = ({ id, name }: NavLinkProps) => {
    const { groupId } = useParams()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const activeClass = groupId
        ? Number(groupId) === id
            ? 'bg-stone-300'
            : ''
        : ''

    const handleDelete = async () => {
        startTransition( async () => {
            await deleteIssueGroup(id)
            router.push('/dashboard')
        })
    }

    return (
        <Link key={id} href={`/issues/${id}`} className={`w-full flex justify-between items-center group hover:bg-stone-300 transition-colors px-3 py-1 rounded-sm ${activeClass}`}>
            <p className='text-sm'>{name}</p>
            {
                isPending
                    ? <Spinner />
                    : <MdDeleteOutline
                        width={4}
                        height={4}
                        onClick={ handleDelete }
                        className='hidden group-hover:block text-stone-500'
                    />
            }
        </Link>
    )
}

export default NavLink