const IssuePageSkeleton = () => {
    return (
        <div className="w-full max-w-4xl flex flex-col gap-5 mt-6 animate-pulse">
            <div className="h-4 w-32 bg-stone-300 rounded-sm" />

            <div className="w-full flex items-start justify-between">
                <div className="h-8 w-2/3 bg-stone-300 rounded-sm" />
                <div className="flex gap-3">
                    <div className="h-8 w-8 bg-stone-300 rounded-sm" />
                    <div className="h-8 w-8 bg-stone-300 rounded-sm" />
                </div>
            </div>

            <div className="w-full bg-stone-200 border border-stone-300 rounded-sm p-4">
                <div className="flex gap-3 mb-4">
                    <div className="h-4 w-20 bg-stone-300 rounded-sm" />
                    <div className="h-4 w-20 bg-stone-300 rounded-sm" />
                    <div className="h-4 w-28 bg-stone-300 rounded-sm" />
                    <div className="h-4 w-28 bg-stone-300 rounded-sm" />
                </div>

                <div className="space-y-2">
                    <div className="h-4 w-full bg-stone-300 rounded-sm" />
                    <div className="h-4 w-5/6 bg-stone-300 rounded-sm" />
                    <div className="h-4 w-2/3 bg-stone-300 rounded-sm" />
                </div>
            </div>

            <div className="w-full bg-stone-200 border border-stone-300 rounded-sm p-4">
                <div className="h-5 w-24 bg-stone-300 rounded-sm mb-4" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i}>
                            <div className="h-3 w-20 bg-stone-300 rounded-sm mb-2" />
                            <div className="h-4 w-32 bg-stone-300 rounded-sm" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IssuePageSkeleton;
