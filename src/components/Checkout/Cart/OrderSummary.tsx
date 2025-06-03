import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

interface OrderSummaryProps {
    itemCount: number;
    totalPrice: number;
}

const OrderSummary = ({ itemCount, totalPrice }: OrderSummaryProps) => {
    return (
        <Card className="sticky top-8 gap-4">
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>$0</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
                <CheckoutButton />
                <Button size="lg" className="w-full" variant="outline" asChild>
                    <Link href="/">
                        Continue Shopping
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default OrderSummary; 