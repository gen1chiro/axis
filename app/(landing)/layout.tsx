import Nav from "@/components/shared/nav";
import Footer from "@/components/shared/footer";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen flex flex-col items-center justify-between gap-10'>
            <Nav />
            {children}
            <Footer />
        </div>
    )
}

export default LandingLayout;