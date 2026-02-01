import DashboardNav from "@/components/dashboard-nav"
import { Suspense } from 'react'

const IssuesLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen'>
            <DashboardNav />
            <main className="min-h-screen pl-14 lg:pl-64">
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </main>
        </div>
    )
}

export default IssuesLayout