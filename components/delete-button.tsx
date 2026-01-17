'use client';

import { FiTrash2 } from "react-icons/fi";
import { deleteIssue } from "@/app/actions/issues";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Spinner from "@/components/spinner";

type DeleteButtonProps = {
    issueID: number;
}

const DeleteButton = ({ issueID }: DeleteButtonProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        startTransition( async () => {
            await deleteIssue(issueID);
            router.push("/dashboard");
        });
    }

    return (
        <button
            onClick={ handleDelete }
            disabled={ isPending }
            className={`flex items-center gap-2 p-2 text-white text-xs text-heading rounded-sm transition-colors ${isPending ? 'bg-zinc-600 cursor-not-allowed' : 'bg-zinc-900 hover:bg-zinc-800'}`}>
            { isPending
                ? <Spinner />
                :<FiTrash2 className="w-4 h-4" />
            }
        </button>
    )
}

export default DeleteButton;