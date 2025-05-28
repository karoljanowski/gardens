import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";

const EmptyCart = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                    <ShoppingBag className="h-6 w-6" />
                    Your Cart is Empty
                </h1>
                <p className="text-neutral-300 mb-8">
                    Looks like you haven't added any courses to your cart yet. 
                    Explore our courses and start your gardening journey!
                </p>
                <Link href="/">
                    <Button size="lg" className="inline-flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default EmptyCart; 