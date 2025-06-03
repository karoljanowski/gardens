import CheckoutHeader from "@/components/Checkout/CheckoutHeader";
import SignUpForm from "@/components/Auth/SignUp/SignUpForm";
import { getSession } from "@/server/auth";
import { redirect } from "next/navigation";

const SignUp = async () => {
    const session = await getSession()
    if (session?.user) {
        redirect("/dashboard")
    }
    return (
        <div className="container mx-auto px-4 py-4">
            <CheckoutHeader backToLink="/cart" buttonText="Back to Cart" title="Create Account" />
            <SignUpForm />
        </div>
    );
};

export default SignUp;
