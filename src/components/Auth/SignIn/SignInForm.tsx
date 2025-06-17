"use client";
import { Button } from "@/components/ui/button";
import LabelInput from "@/components/ui/labelinput";
import { signIn } from "@/server/auth";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const SignInForm = ({ redirectToCart }: { redirectToCart: string }) => {
    const [state, action, isPending] = useActionState(signIn, undefined);

    useEffect(() => {
        if (state?.success) {
            toast.success("Signed in successfully");
            redirect(redirectToCart == '1' ? "/cart" : "/dashboard");
        }

        if (state?.errors?.auth) {
            toast.error(state.errors.auth[0]);
        }
    }, [state]);

    return (
        <div>
            <form action={action} className="flex flex-col gap-2">
                <LabelInput type="email" id="email" label="Email" placeholder="Enter your email" error={state?.errors?.email?.[0]} />
                <LabelInput type="password" id="password" label="Password" placeholder="Enter your password" error={state?.errors?.password?.[0]} />
                <Button variant="secondary" className="mt-4" type="submit" disabled={isPending}>{isPending ? "Signing in..." : "Sign In"}</Button>
            </form>
        </div>
    )
}
export default SignInForm;