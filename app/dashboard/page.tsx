import { getSession } from "@/lib/auth";

const DashboardPage = async () => {
    const session = await getSession();
    console.log(session);
    return (
        <h1 className='text-heading'>Dashboard</h1>
    )
}

export default DashboardPage;