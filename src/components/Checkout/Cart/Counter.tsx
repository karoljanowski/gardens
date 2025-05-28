'use client';

import { useCartStore } from "@/stores/useCartStore";
import { useEffect, useState } from "react";
import Loader from "../../ui/loader";

const Counter = () => {
    const { items, getCart } = useCartStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            await getCart();
            setIsLoading(false);
        }
        init();
    }, []);

    return (
        <div className="bg-white h-4 w-4 rounded-full flex items-center justify-center absolute -top-1 -right-1">
            <span className="text-xs font-bold text-black p-1 block">{isLoading ? <Loader /> : items.length}</span>
        </div>
    )
}

export default Counter;