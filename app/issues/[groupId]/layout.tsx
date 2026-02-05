import DashboardNav from "@/components/dashboard-nav"
import { Suspense } from 'react'

const IssuesLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen'>
            <DashboardNav />
            <main className="relative min-h-screen pl-18 lg:pl-68 pr-4 py-4">
                <Suspense>
                    {children}
                </Suspense>
            </main>
        </div>
    )
}

export default IssuesLayout