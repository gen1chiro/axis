import Image from "next/image";
import axisLogo from "@/public/images/axis-logo.png";
import Link from "next/link";
import { GoHome } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import React, { Suspense } from "react";
import UserEmail from "@/components/user-email";
import LogoutButton from "../components/logout-button";
import DotsLoader from "@/components/dots-loader";
import NavGroups from "@/components/nav-groups";
import NavGroupsSkeleton from "@/components/nav-groups-skeleton";
import NavButton from "@/components/nav-button";

const DashboardNav = () => {
    return (
        <aside className="fixed top-0 left-0 inset-y-0 bg-stone-200 border-r border-stone-300 w-14 lg:w-64 flex flex-col justify-between items-start py-4 px-3">
            <div className='w-full flex flex-col items-center lg:items-start gap-4'>
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

                <nav className="w-full flex flex-col gap-1 text-heading text-sm mt-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center justify-center lg:justify-start gap-3 lg:px-3 py-2 text-sm rounded-sm hover:bg-stone-300 transition-colors"
                    >
                        <GoHome className="w-5 h-5" />
                        <span className="hidden lg:block">Dashboard</span>
                    </Link>

                    <NavButton />
                </nav>

                <div className='w-full hidden lg:block px-3'>
                    <h1 className='text-body text-xs'>Groups</h1>
                    <Suspense fallback={<NavGroupsSkeleton />}>
                        <NavGroups />
                    </Suspense>
                </div>

            </div>

            <div className="w-full flex flex-col gap-4">
                <div className="w-full border-t border-dotted border-stone-400" />
                <div className="hidden lg:flex justify-center items-center gap-3 px-3 py-2 text-body bg-stone-100 rounded-sm shadow-sm">
                    <FiUser className="w-4 h-4" />
                    <Suspense fallback={<DotsLoader />}>
                        <UserEmail className='text-xs'/>
                    </Suspense>
                </div>
                <LogoutButton />
            </div>
        </aside>
    )
}

export default DashboardNav;