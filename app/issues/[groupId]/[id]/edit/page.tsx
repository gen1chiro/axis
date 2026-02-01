import IssueForm from "@/components/issue-form";
import { getIssueById } from "@/lib/dal";

type EditIssuePageProps = {
    params: Promise<{ id: string }>
}

const EditIssuePage = async ({ params }: EditIssuePageProps) => {
    const { id } = await params;
    const issue = await getIssueById(id);

    return (
        <>
            <IssueForm isEditing={ true } issue={ issue }/>
            <div
                className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(120, 113, 108, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '12px 12px',
                    maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)'
                }}
            />
        </>
    );
}

export default EditIssuePage;