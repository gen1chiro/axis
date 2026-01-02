import Image from "next/image";
import axisLogo from "@/public/images/axis-logo.png";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import React, { Suspense } from "react";
import UserEmail from "@/components/user-email";

const DashboardNav = () => {
    return (
        <aside className="fixed top-0 left-0 inset-y-0 bg-stone-200 shadow-md w-14 lg:w-64 flex flex-col justify-between items-start py-4 px-3">
            <div className='w-full flex flex-col items-center lg:items-start gap-8'>
                <Link
                    href={'/'}
                    className='flex items-center justify-center text-body text-base lg:px-3'
                >
                    <Image
                        src={axisLogo}
                        alt={'axis logo'}
                        className='w-6 h-6'
                    />
                    <p className='hidden lg:block'>Axis</p>
                </Link>

                <nav className="w-full flex flex-col gap-1 text-heading text-sm">
                    <Link
                        href="/dashboard"
                        className="flex items-center justify-center lg:justify-start gap-3 lg:px-3 py-2 rounded-sm hover:bg-stone-300 transition-colors"
                    >
                        <GoHome className="w-5 h-5" />
                        <span className="hidden lg:block">Dashboard</span>
                    </Link>

                    <Link
                        href="/issues/new"
                        className="flex items-center justify-center lg:justify-start gap-3 lg:px-3 py-2 rounded-sm hover:bg-stone-300 transition-colors"
                    >
                        <MdAdd className="w-5 h-5" />
                        <span className="hidden lg:block">New Issue</span>
                    </Link>
                </nav>
            </div>

            <div className="w-full flex flex-col gap-4">
                <div className="w-full border-t border-dotted border-stone-400" />
                <div className="hidden lg:flex justify-center items-center gap-3 px-3 py-2 text-body bg-stone-100 rounded-sm shadow-sm">
                    <FiUser className="w-4 h-4" />
                    <Suspense fallback={<div className='text-stone-500 text-xs'>...loading</div>}>
                        <UserEmail />
                    </Suspense>
                </div>

                <button className='flex items-center gap-1 justify-center bg-zinc-900 text-heading text-white text-sm rounded-sm hover:bg-zinc-800 transition-colors lg:px-4 py-1'>
                    <RiLogoutBoxLine className="w-4 h-4" />
                    <span className="hidden lg:block">Sign Out</span>
                </button>
            </div>
        </aside>
    )
}

export default DashboardNav;