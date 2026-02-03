import { Suspense } from "react";
import EditPageSkeleton from "@/components/edit-page-skeleton";

const EditPageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full min-h-dvh bg-background flex items-center justify-center p-4">
            <Suspense fallback={<EditPageSkeleton />}>
                { children }
            </Suspense>
        </div>
    )
}

export default EditPageLayout;