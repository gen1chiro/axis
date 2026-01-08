'use client';

import { FiTrash2 } from "react-icons/fi";
import { deleteIssue } from "@/app/actions/issues";
import { useRouter } from "next/navigation";

type DeleteButtonProps = {
    issueID: number;
}

const DeleteButton = ({ issueID }: DeleteButtonProps) => {
    const router = useRouter();

    const handleDelete = async () => {
        await deleteIssue(issueID);
        router.push("/dashboard");
    }

    return (
        <button
            onClick={ handleDelete }
            className="flex items-center gap-2 p-2 bg-black hover:bg-zinc-800 text-white text-xs text-heading rounded-sm transition-colors">
            <FiTrash2 className="w-4 h-4" />
        </button>
    )
}

export default DeleteButton;