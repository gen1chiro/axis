import { Issue } from "@/db/schema";

type PriorityPillProps = {
    priority: Issue['priority'];
}

const PriorityPill = ({ priority }: PriorityPillProps) => {
    const pillColor = (() => {
        switch (priority) {
            case 'low':
                return 'bg-purple-400';
            case 'medium':
                return 'bg-purple-500';
            case 'high':
                return 'bg-purple-600';
            default:
                return '';
        }
    });

    return (
        <span className={`py-1 px-2 rounded-full text-body text-xs text-white capitalize ${pillColor()}`}>
            {priority}
        </span>
    )
}

export default PriorityPill;