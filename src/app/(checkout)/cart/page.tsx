'use client';

import { useCartStore } from "@/stores/useCartStore";
import EmptyCart from "@/components/Checkout/Cart/EmptyCart";
import CartHeader from "@/components/Checkout/Cart/CartHeader";
import CartItemsList from "@/components/Checkout/Cart/CartItemsList";
import CartSidebar from "@/components/Checkout/Cart/CartSidebar";
import CartLoading from "@/components/Checkout/Cart/CartLoading";

const CartPage = () => {
    const { items, isLoading, removeFromCart, getTotalPrice } = useCartStore();
    const totalPrice = getTotalPrice();

    if (isLoading) {
        return <CartLoading />;
    }

    if (items.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="container mx-auto px-4 py-4">
            <CartHeader itemCount={items.length} />

            <div className="grid lg:grid-cols-3 gap-8">
                <CartItemsList 
                    items={items}
                    onRemoveItem={removeFromCart}
                />
                
                <CartSidebar 
                    itemCount={items.length}
                    totalPrice={totalPrice}
                />
            </div>
        </div>
    );
};

export default CartPage;
