import React from "react";
import GroupForm from "@/components/group-form";
import GroupDisplay from "@/components/group-display";
import { Suspense } from "react";

const DashboardPage =  () => {
    return (
        <div className='w-full flex flex-col items-center justify-center gap-8 py-4 px-8'>
            <div className='w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                <h1 className='text-heading font-semibold text-2xl text-center'>Issues</h1>
                <GroupForm />
            </div>
            <div className='w-full bg-stone-200 border border-stone-300 rounded-sm flex flex-col px-2 pt-1 pb-4'>
                <div className='grid grid-cols-6 md:grid-cols-12 gap-4 text-body p-2 text-xs text-stone-500 justify-items-center items-center'>
                    <h1 className='col-span-4 md:col-span-8 w-full text-left'>Name</h1>
                    <h1 className='hidden md:block col-span-2'>Updated</h1>
                    <h1 className='col-span-2 w-full text-right'>Created</h1>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <GroupDisplay />
                </Suspense>
            </div>
        </div>
    )
}

export default DashboardPage;