'use client';

import { useCartStore } from "@/stores/useCartStore";
import EmptyCart from "@/components/Checkout/Cart/EmptyCart";
import CheckoutHeader from "@/components/Checkout/CheckoutHeader";
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
            <CheckoutHeader backToLink="/" buttonText="Back to Courses" title={`Shopping Cart (${items.length} items)`} />

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
