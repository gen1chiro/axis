import { requireAuthenticatedUser } from "@/lib/dal";

const UserEmail = async () => {
    const user = await requireAuthenticatedUser()

    return (
        <span className='truncate text-xs'>{user?.email}</span>
    )
}

export default UserEmail;