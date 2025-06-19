'use client';
import { Course as TCourse } from "@prisma/client";
import { useCartStore } from "@/stores/useCartStore";
import { useEffect } from "react";

const Counter = ({ cart }: { cart: TCourse[] | null }) => {
    const { setCart, items, initialized } = useCartStore();
    const count = initialized ? items.length : cart?.length || 0;

    useEffect(() => {
        if (cart) {
            setCart(cart);
        }
    }, [cart]);


    return (
        <div className="bg-white h-4 w-4 rounded-full flex items-center justify-center absolute -top-1 -right-1">
            <span className="text-xs font-bold text-black p-1 block">{count}</span>
        </div>
    )
}

export default Counter;