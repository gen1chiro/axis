import { Issue } from "@/db/schema";

type StatusPillProps = {
    status: Issue['status'];
}

const StatusPill = ({ status }: StatusPillProps) => {
    const formattedStatus = status.replace('_', ' ');
    const pillColor = (() => {
        switch (status) {
            case 'backlog':
                return 'bg-stone-700';
            case 'todo':
                return 'bg-stone-600';
            case 'in_progress':
                return 'bg-stone-500';
            case 'done':
                return 'bg-stone-400';
            default:
                return '';
        }
    });

    return (
        <span className={`py-1 px-2 rounded-full text-body text-xs text-white capitalize ${pillColor()}`}>
            {formattedStatus}
        </span>
    )
}

export default StatusPill;