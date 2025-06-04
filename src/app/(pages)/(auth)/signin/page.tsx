import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SignInForm from "@/components/Auth/SignIn/SignInForm"
import { getSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header/Header";

const SignIn = async ({ searchParams }: { searchParams: { redirectToCart: string } }) => {
    const { redirectToCart } = await searchParams
    const session = await getSession()
    if (session?.user) {
        redirect("/dashboard")
    }
    return (
        <div className="flex flex-col gap-4 justify-center items-center h-full w-full">
            <h1 className="text-4xl font-bold">Sign In</h1>
            <Card className="w-full max-w-md">
                <CardContent>
                    <SignInForm redirectToCart={redirectToCart} />
                </CardContent>
            </Card>
        </div>
    )
}

export default SignIn;