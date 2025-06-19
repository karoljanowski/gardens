import { ShoppingBagIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Counter from "@/components/Checkout/Counter";
import { cookies } from "next/headers";
import { getCart } from "@/server/cart";
import { Course as TCourse } from "@prisma/client";

const HeaderCart = async () => {
    const cookieStore = await cookies()
    const cartId = cookieStore.get('cartId')?.value || null;
    let cart: TCourse[] | null = null;

    if (cartId) {
        const cartData = await getCart(cartId)
        cart = cartData?.items || null
    }

    return (
        <Button asChild size="icon" className="relative">
            <Link href="/cart">
                <ShoppingBagIcon />
                <Counter cart={cart} />
            </Link>
        </Button>
    )
}

export default HeaderCart;