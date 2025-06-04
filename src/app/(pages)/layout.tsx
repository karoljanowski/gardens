import Header from "@/components/Header/Header";

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="container mx-auto px-4 min-h-[calc(100vh-100px)] flex items-center justify-center">
                {children}
            </main>
        </>
    )
}

export default PagesLayout;