import TaskForm from "@/components/task-form";
import React from "react";

const NewIssuePage = () => {
    return (
        <div className="min-h-dvh bg-background flex items-center justify-center p-4 relative">
            <TaskForm />
            <div
                className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(120, 113, 108, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '12px 12px',
                    maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)'
                }}
            />
        </div>
    )
}

export default NewIssuePage;