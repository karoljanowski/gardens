'use client';
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const CheckoutButton = () => {
    const {data, isPending} = useSession();

    const handleCheckout = async () => {
        const response = await fetch("/api/checkout_sessions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            toast.error("Failed to proceed to checkout");
            return;
        }

        const data = await response.json();
        toast.success("Redirecting to checkout...");
        redirect(data.url);
    }

    if (isPending) {
        return <LoadingSession />;
    }

    if (!data?.user) {
        return <LoginButton />;
    }

    return (
        <Button size="lg" className="w-full" onClick={handleCheckout}>
            Proceed to Checkout
        </Button>
    )
}

const LoginButton = () => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2">
                <Button size="lg" className="w-full" asChild>
                    <Link href="/signin?from=cart">
                        Sign In
                    </Link>
                </Button>
                <Button size="lg" className="w-full" variant="secondary" asChild>
                    <Link href="/signup?from=cart">
                        Sign Up
                    </Link>
                </Button>
            </div>
            <span className="text-sm text-muted-foreground text-center">You need to be logged in to checkout</span>
        </div>
    )
}

const LoadingSession = () => {
    return (
        <Button size="lg" className="w-full" disabled>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading ...</span>
        </Button>
    )
}

export default CheckoutButton;