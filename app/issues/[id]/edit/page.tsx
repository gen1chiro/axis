import TaskForm from "@/components/task-form";
import { getIssueById } from "@/lib/dal";

type EditIssuePageProps = {
    params: Promise<{ id: string }>
}

const EditIssuePage = async ({ params }: EditIssuePageProps) => {
    const { id } = await params;
    const issue = await getIssueById(id);

    return (
        <div className="w-full min-h-dvh bg-background flex items-center justify-center p-4 relative">
            <TaskForm isEditing={ true } issue={ issue }/>
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

export default EditIssuePage;