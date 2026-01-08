import { requireAuthenticatedUser } from "@/lib/dal";

type UserEmailProps = {
    className?: string;
}

const UserEmail = async ({ className }: UserEmailProps) => {
    const user = await requireAuthenticatedUser()

    return (
        <span className={`truncate ${className}`}>{user?.email}</span>
    )
}

export default UserEmail;