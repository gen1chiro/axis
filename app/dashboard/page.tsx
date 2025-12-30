import { requireAuthenticatedUser } from "@/lib/dal";

const DashboardPage = async () => {
    const user = await requireAuthenticatedUser();
    console.log(user)

    return (
        <div>
            <h1 className='text-heading'>Dashboard</h1>
            <button
                className='bg-zinc-900 text-heading text-white text-sm rounded-sm hover:bg-zinc-800 transition-colors px-4 py-1'
            >log out</button>
        </div>
    )
}

export default DashboardPage;