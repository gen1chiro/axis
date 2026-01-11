'use client';

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
}

const Error = ({error, reset}: ErrorProps) => {
    return (
        <main className="min-h-screen w-full bg-background flex items-center justify-center p-2">
            <div className="relative flex flex-col items-start justify-center gap-8 bg-stone-200 border border-stone-300 rounded-sm p-4">
                <div className='flex flex-col items-start justify-center'>
                    <h1 className="text-xl md:text-2xl font-semibold text-heading">
                        Oops! looks like <span className='underline decoration-dotted decoration-purple-400'>something went wrong!</span>
                    </h1>
                    <p className="text-sm text-body">
                        We encountered an unexpected error
                    </p>
                </div>
                <div>
                    <p className='text-xs text-stone-500 text-body'>message:</p>
                    <p className="text-sm text-body">
                        {error.message || 'An unknown error occurred'}
                    </p>
                </div>
                <button
                    className='bg-zinc-900 text-heading text-white text-sm rounded-sm hover:bg-zinc-800 transition-colors px-4 py-1'
                    onClick={reset}>
                    Reload
                </button>
                <div
                    className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(120, 113, 108, 0.3) 1px, transparent 1px)`,
                        backgroundSize: '12px 12px',
                        maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)'
                    }}
                />
            </div>
        </main>
    )
}

export default Error;