import { requireAuthenticatedUser, getUserIssueGroups } from '@/lib/dal'
import NavLink from '@/components/nav-link'

const NavGroups = async () => {
    const user = await requireAuthenticatedUser()
    const groups = await getUserIssueGroups(user.id)

    return (
        <div className='w-full flex flex-col gap-1 items-center justify-center mt-1'>
            {
                groups.map(({id, name}) => (
                    <NavLink key={id} id={id} name={name} />
                ))
            }
        </div>
    )
}

export default NavGroups