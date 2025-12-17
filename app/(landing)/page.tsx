import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

const HomePage = () => {
    return (
        <div className='w-responsive flex flex-col items-start justify-center'>
            <div className='w-3/4 md:w-1/2 flex flex-col items-start gap-4'>
                <div className='text-heading text-4xl sm:text-5xl'>
                    <h1>Pinpoint problems.</h1>
                    <h1>Fix with clarity.</h1>
                </div>
                <p className='text-body text-sm'>
                    Track issues at their core and move projects forward with confidence. Axis helps you surface, track, and resolve issues—nothing extra, just what matters.
                </p>
                <Link
                    href={'/signup'}
                    className='flex justify-center items-center gap-1 text-body text-sm text-background bg-zinc-900 rounded-sm px-2 py-1 hover:bg-stone-800'
                >
                    Try for free
                    <GoArrowUpRight />
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
