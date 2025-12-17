import Nav from "@/components/shared/nav";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            <Nav />
            {children}
        </div>
    )
}

export default LandingLayout;