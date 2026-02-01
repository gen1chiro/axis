'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

type NavLinkProps = {
    id: number
    name: string
}

const NavLink = ({ id, name }: NavLinkProps) => {
    const { groupId } = useParams()
    const activeClass = groupId
        ? Number(groupId) === id
            ? 'bg-stone-300'
            : ''
        : ''

    return (
        <Link key={id} href={`/issues/${id}`} className={`w-full hover:bg-stone-300 transition-colors px-3 py-1 rounded-sm ${activeClass}`}>
            <p className='text-sm'>{name}</p>
        </Link>
    )
}

export default NavLink