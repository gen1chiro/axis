'use client';

import { signOut } from "@/app/actions/auth";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useTransition } from "react";
import Spinner from "@/components/spinner";

const LogoutButton = () => {
    const [isPending, startTransition] = useTransition();

    const handleSignOut = async () => {
        startTransition(async () => {
            await signOut();
        });
    }

    return (
        <button
            onClick={ handleSignOut }
            disabled={ isPending }
            className={`flex items-center gap-1 justify-center text-heading text-white text-sm rounded-sm transition-colors lg:px-4 py-1 ${isPending ? 'bg-zinc-600 cursor-not-allowed' : 'bg-zinc-900 hover:bg-zinc-800'}`}>
            {isPending
                ? <Spinner />
                : <RiLogoutBoxLine className="w-4 h-4" />
            }
            <span className="hidden lg:block">
                {isPending ? 'Signing Out' : 'Sign Out'}
            </span>
        </button>
    )
}

export default LogoutButton;