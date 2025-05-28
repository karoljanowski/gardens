import { getSession, signIn, signOut } from "@/server/auth";

const SignInForm = async () => {
    const session = await getSession()

    return (
        <div>
            <div>
                {session?.user.name}
            </div>
            <button onClick={signIn}>Sign In</button>
            <button onClick={signOut}>Sign Out</button>
        </div>
    )
}
export default SignInForm;