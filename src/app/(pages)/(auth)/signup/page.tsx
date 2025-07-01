import SignUpForm from "@/components/Auth/SignUp/SignUpForm";
import { getSession } from "@/server/auth";
import { redirect } from "next/navigation";

const SignUp = async ({ searchParams }: { searchParams: Promise<{ redirectToCart: string }> }) => {
    const {redirectToCart} = await searchParams
    const session = await getSession()
    if (session?.user) {
        redirect("/dashboard")
    }
    return (
        <div className="flex flex-col gap-4 justify-center items-center h-full w-full bg-white p-12 rounded-xl">
            <h1 className="text-4xl font-bold">Sign Up</h1>
            <SignUpForm redirectToCart={redirectToCart} />
        </div>
    );
};

export default SignUp;
