"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { signUp } from "@/server/auth";
import LabelInput from "@/components/ui/labelinput";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUpForm = ({ redirectToCart }: { redirectToCart: string }) => {
    const [state, action, isPending] = useActionState(signUp, undefined);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            router.push(redirectToCart == '1' ? "/cart" : "/dashboard");
            toast.success("Account created successfully");
        }
        if (state?.errors.auth) {
            toast.error(state.errors.auth[0]);
        }
    }, [state]);

    return (
        <div className="w-full">
                <form action={action} className="flex flex-col gap-4">
                    <h3 className="text-lg font-medium">Account credentials</h3>

                    <LabelInput type="email" id="email" label="Email" placeholder="Enter your email" error={state?.errors?.email?.[0]} defaultValue={state?.data?.email} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <LabelInput type="password" id="password" label="Password" placeholder="Enter your password" error={state?.errors?.password?.[0]} defaultValue={state?.data?.password} />
                        <LabelInput type="password" id="confirmPassword" label="Confirm Password" placeholder="Confirm your password" error={state?.errors?.confirmPassword?.[0]} defaultValue={state?.data?.confirmPassword} />
                    </div>

                    <Separator />

                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <LabelInput type="text" id="firstName" label="First Name" placeholder="Enter your first name" error={state?.errors?.firstName?.[0]} defaultValue={state?.data?.firstName} />

                        <LabelInput type="text" id="lastName" label="Last Name" placeholder="Enter your last name" error={state?.errors?.lastName?.[0]} defaultValue={state?.data?.lastName} />
                    </div>

                    <Separator />

                    <h3 className="text-lg font-medium">Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">                        
                        <LabelInput type="text" id="address" label="Address" placeholder="Enter your address" error={state?.errors?.address?.[0]} defaultValue={state?.data?.address} />

                        <LabelInput type="text" id="city" label="City" placeholder="Enter your city" error={state?.errors?.city?.[0]} defaultValue={state?.data?.city} />

                        <LabelInput type="text" id="postalCode" label="Postal Code" placeholder="Enter your postal code" error={state?.errors?.postalCode?.[0]} defaultValue={state?.data?.postalCode} />

                        <LabelInput type="text" id="country" label="Country" placeholder="Enter your country" error={state?.errors?.country?.[0]} defaultValue={state?.data?.country} />
                    </div>

                    <Button className="mt-4 w-full" type="submit" disabled={isPending}>
                        {isPending ? <Loader2 className="animate-spin" /> : "Create account"}
                    </Button>

                </form>
        </div>
    )
}

export default SignUpForm;