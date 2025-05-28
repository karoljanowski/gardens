import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CartHeaderProps {
    itemCount: number;
}

const CartHeader = ({ itemCount }: CartHeaderProps) => {
    return (
        <div className="flex flex-col gap-4 mb-8">
            <Link href="/">
                <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Courses
                </Button>
            </Link>
            <h1 className="text-3xl font-bold">Shopping Cart ({itemCount} items)</h1>
        </div>
    );
};

export default CartHeader; 