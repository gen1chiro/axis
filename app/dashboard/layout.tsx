import DashboardNav from "@/components/dashboard-nav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen'>
            <DashboardNav />
            <main className="min-h-screen pl-14 lg:pl-64">
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout;