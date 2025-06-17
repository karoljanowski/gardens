import SignInForm from "@/components/Auth/SignIn/SignInForm"
import { getSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const SignIn = async ({ searchParams }: { searchParams: Promise<{ redirectToCart: string }> }) => {
    const { redirectToCart } = await searchParams
    const session = await getSession()
    if (session?.user) {
        redirect("/dashboard")
    }
    return (
        <div className="flex flex-col justify-center items-center h-full w-full">
            <h1 className="text-2xl font-bold mb-2">Welcome to Gardens</h1>
            <p className="mb-6">Don&apos;t have an account? <Link href="/signup" className="underline">Sign up</Link></p>
            <div className="w-full max-w-md">
                <SignInForm redirectToCart={redirectToCart} />
            </div>
        </div>
    )
}

export default SignIn;