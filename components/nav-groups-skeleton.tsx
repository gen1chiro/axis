const NavGroupsSkeleton = () => {
    return (
        <div className='w-full flex flex-col gap-1 mt-1'>
            {[...Array(4)].map((_, i) => (
                <div key={i} className='w-full py-1 rounded-sm h-6 bg-stone-300 animate-pulse' />
            ))}
        </div>
    )
}

export default NavGroupsSkeleton

