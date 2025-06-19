'use client';
import { Course as TCourse } from "@prisma/client";
import CartItem from "./CartItem";
import { useCartStore } from "@/stores/useCartStore";

interface CartItemsListProps {
    items: TCourse[];
}

const CartItemsList = ({ items }: CartItemsListProps) => {
    const { items: cartItems, initialized } = useCartStore();
    const currentItems = initialized ? cartItems : items;

    return (
        <div className="lg:col-span-2 space-y-4">
            {currentItems.map((course) => (
                <CartItem 
                    key={course.id} 
                    course={course} 
                />
            ))}
        </div>
    );
};

export default CartItemsList; 