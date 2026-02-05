const GroupDisplaySkeleton = () => {
    return (
        <>
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className='w-full p-2 text-sm border-b border-dotted border-stone-300 grid grid-cols-6 md:grid-cols-12 gap-4 justify-items-center items-center animate-pulse'>
                    <div className='col-span-4 md:col-span-8 w-full flex'>
                        <div className='h-5 bg-stone-300 rounded-sm w-3/4'></div>
                    </div>
                    <div className='hidden md:flex col-span-2 w-full justify-center'>
                        <div className='h-4 bg-stone-300 rounded-sm w-16'></div>
                    </div>
                    <div className='col-span-2 w-full flex justify-end'>
                        <div className='h-4 bg-stone-300 rounded-sm w-16'></div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default GroupDisplaySkeleton;

