import { requireAuthenticatedUser } from "@/lib/dal";

const DashboardPage = async () => {
    const user = await requireAuthenticatedUser();
    console.log(user)

    return (
        <div>
            <h1 className='text-heading'>Dashboard</h1>
        </div>
    )
}

export default DashboardPage;