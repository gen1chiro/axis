import Link from 'next/link';
import Image from 'next/image';
import axisLogo from '@/public/images/axis-logo.png';

const Nav = () => {
    return (
        <nav className='sticky z-50 top-4 w-11/12 max-w-2xl flex justify-between items-center text-body text-background bg-zinc-900 rounded-sm p-2 mt-4 text-sm'>
            <Link
                href={'/'}
                className='flex items-center justify-center'
            >
                <Image
                    src={axisLogo}
                    alt={'axis logo'}
                    className='invert w-5 h-5'
                />
                <p>Axis</p>
            </Link>
            <div className='hidden sm:block'>
                <ul className='flex gap-6'>
                    <li className='decoration-dotted hover:underline'>
                        <Link href={'/features'}>Features</Link>
                    </li>
                    <li className='decoration-dotted hover:underline'>
                        <Link href={'/pricing'}>Pricing</Link>
                    </li>
                    <li className='decoration-dotted hover:underline'>
                        <Link href={'/faq'}>FAQ</Link>
                    </li>
                </ul>
            </div>
            <div>
                <ul className='flex items-center gap-4 transition-colors ease-in-out duration-200'>
                    <li className='rounded-xs px-2 py-1 hover:bg-stone-800'>
                        <Link href={'/signin'}>Login</Link>
                    </li>
                    <li className='bg-white rounded-xs text-foreground px-2 py-1 hover:bg-stone-100'>
                        <Link href={'/signup'}>Get Started</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;