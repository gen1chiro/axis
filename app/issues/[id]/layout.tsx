import { Suspense } from "react";

const IssueLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full min-h-dvh bg-background flex items-start justify-center">
            <Suspense fallback={<h1>loading...</h1>}>
                {children}
            </Suspense>
        </div>
    );
}

export default IssueLayout;