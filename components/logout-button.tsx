'use client';

import { signOut } from "@/app/actions/auth";
import { RiLogoutBoxLine } from "react-icons/ri";

const LogoutButton = () => {

    const handleSignOut = async () => {
        await signOut();
    }

    return (
        <button
            onClick={handleSignOut}
            className='flex items-center gap-1 justify-center bg-zinc-900 text-heading text-white text-sm rounded-sm hover:bg-zinc-800 transition-colors lg:px-4 py-1'>
            <RiLogoutBoxLine className="w-4 h-4" />
            <span className="hidden lg:block">Sign Out</span>
        </button>
    )
}

export default LogoutButton;