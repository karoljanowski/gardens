import CheckoutHeader from "@/components/Checkout/CheckoutHeader";
import SignUpForm from "@/components/Auth/SignUp/SignUpForm";
import { getSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header/Header";

const SignUp = async ({ searchParams }: { searchParams: { redirectToCart: string } }) => {
    const {redirectToCart} = await searchParams
    const session = await getSession()
    if (session?.user) {
        redirect("/dashboard")
    }
    return (
        <div className="flex flex-col gap-4 justify-center items-center h-full w-full mt-6">
            <h1 className="text-4xl font-bold">Sign Up</h1>
            <SignUpForm redirectToCart={searchParams.redirectToCart} />
        </div>
    );
};

export default SignUp;
