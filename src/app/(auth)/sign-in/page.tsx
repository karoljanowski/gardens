import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SignInForm from "@/components/SignIn/SignInForm"

const SignIn = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col gap-4 justify-center items-center">
                <h1 className="text-4xl font-bold">Sign In</h1>
                <Card className="w-full max-w-md">
                    <CardContent>
                        <SignInForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SignIn;