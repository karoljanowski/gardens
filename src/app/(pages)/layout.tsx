import Header from "@/components/Header/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header/>
            <main className="container mx-auto px-4 min-h-[calc(100vh-100px)] flex justify-center items-center">
                {children}
            </main>
        </>
    )
}

export default DashboardLayout;