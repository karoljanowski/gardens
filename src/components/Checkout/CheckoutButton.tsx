'use client';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Session } from "better-auth";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const CheckoutButton = ({ session }: { session: Session | null }) => {
    const [loading, setLoading] = useState(false);
    const handleCheckout = async () => {
        setLoading(true);
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
        setLoading(false);
        redirect(data.url);
    }

    if (!session?.userId) {
        return <LoginButton />;
    }

    return (
        <Button size="lg" className="w-full" onClick={handleCheckout} disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
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

export default CheckoutButton;