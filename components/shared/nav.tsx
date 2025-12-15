import Link from 'next/link';

const Nav = () => {
    return (
        <nav className='flex justify-center items-center gap-6 text-body underline'>
            <div>
                <ul className='flex gap-4'>
                    <li>
                        <Link href={'/'}>home</Link>
                    </li>
                    <li>
                        <Link href={'/features'}>features</Link>
                    </li>
                    <li>
                        <Link href={'/pricing'}>pricing</Link>
                    </li>
                    <li>
                        <Link href={'/faq'}>faqs</Link>
                    </li>
                    <li>
                        <Link href={'/dashboard'}>dashboard</Link>
                    </li>
                    <li>issues</li>
                </ul>
            </div>
            <div>
                <ul className='flex gap-4'>
                    <li>
                        <Link href={'/signup'}>sign up</Link>
                    </li>
                    <li>
                        <Link href={'/signin'}>sign in</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;