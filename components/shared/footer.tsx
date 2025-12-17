import Image from "next/image";
import axisLogo from "@/public/images/axis-logo.png";
import Link from "next/link";

const Footer = () => {
    return (
        <section className='w-full bg-foreground flex flex-col justify-center items-center gap-16 pt-16'>
            <div className='w-full flex flex-col justify-center items-center gap-4'>
                <h1 className='text-background text-heading font-light text-3xl sm:text-4xl text-center'>Progress starts with clarity.</h1>
                <div className='flex justify-center items-center gap-4'>
                    <Link href={'/features'} className='bg-black rounded-xs text-foreground text-white text-xs text-body p-2 hover:bg-stone-900'>Explore the Product</Link>
                    <Link href={'/signup'} className='bg-white rounded-xs text-foreground text-xs text-body p-2 hover:bg-stone-100'>Get Started</Link>
                </div>
            </div>
            <footer className='w-responsive bg-background rounded-t-md text-sm flex flex-col sm:flex-row justify-between items-start gap-10 p-4 pb-16'>
                <Link
                    href={'/'}
                    className='flex items-center justify-center text-body text-lg'
                >
                    <Image
                        src={axisLogo}
                        alt={'axis logo'}
                        className='w-8 h-8'
                    />
                    <p>Axis</p>
                </Link>
                <div className='w-full sm:w-auto text-xs flex items-center justify-between gap-18'>
                    <div>
                        <h1 className='text-heading font-light text-zinc-700'>EXPLORE</h1>
                        <ul className='text-body flex flex-col gap-2 mt-2'>
                            <li>
                                <Link href={'/features'} className='link'>Features</Link>
                            </li>
                            <li>
                                <Link href={'/pricing'} className='link'>Pricing</Link>
                            </li>
                            <li>
                                <Link href={'/faq'} className='link'>FAQ</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h1 className='text-heading font-light text-zinc-700'>LEARN</h1>
                        <ul className='text-body flex flex-col gap-2 mt-2'>
                            <li>
                                Blog
                            </li>
                            <li>
                                News
                            </li>
                            <li>
                                Learn
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h1 className='text-heading font-light text-zinc-700'>CONNECT</h1>
                        <ul className='text-body flex flex-col gap-2 mt-2'>
                            <li>
                                Careers
                            </li>
                            <li>
                                LinkedIn
                            </li>
                            <li>
                                X
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </section>
    )
}

export default Footer;