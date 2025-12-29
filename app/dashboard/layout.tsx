import { Suspense } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <h1>Dashboard Layout</h1>
            <Suspense fallback={<div>...loading</div>}>
                {children}
            </Suspense>
        </div>
    )
}

export default DashboardLayout;