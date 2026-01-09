const IssueDisplaySkeleton = () => {
    return (
        <div className='w-full bg-stone-200 border border-stone-300 rounded-sm flex flex-col px-2 pt-1 pb-4'>
            <div className='grid grid-cols-6 lg:grid-cols-12 gap-4 text-body p-2 text-xs text-stone-500 justify-items-center items-center'>
                <h1 className='col-span-4 lg:col-span-6 w-full text-left'>Title</h1>
                <h1 className='hidden lg:block col-span-2'>Status</h1>
                <h1 className='hidden lg:block col-span-2'>Priority</h1>
                <h1 className='col-span-2 w-full text-right'>Created</h1>
            </div>

            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className='w-full p-2 text-sm border-b border-dotted border-stone-300 grid grid-cols-6 lg:grid-cols-12 gap-4 justify-items-center items-center animate-pulse'>
                    <div className='col-span-4 lg:col-span-6 w-full flex'>
                        <div className='h-5 bg-stone-300 rounded-sm w-3/4'></div>
                    </div>
                    <div className='hidden lg:flex col-span-2 w-full justify-center'>
                        <div className='h-6 bg-stone-300 rounded-sm w-20'></div>
                    </div>
                    <div className='hidden lg:flex col-span-2 w-full justify-center'>
                        <div className='h-6 bg-stone-300 rounded-sm w-16'></div>
                    </div>
                    <div className='col-span-2 w-full flex justify-end'>
                        <div className='h-4 bg-stone-300 rounded-sm w-16'></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default IssueDisplaySkeleton;