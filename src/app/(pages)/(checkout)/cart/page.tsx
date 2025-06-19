import EmptyCart from "@/components/Checkout/EmptyCart";
import CheckoutHeader from "@/components/Checkout/CheckoutHeader";
import CartItemsList from "@/components/Checkout/CartItemsList";
import CartSidebar from "@/components/Checkout/CartSidebar";
import { getCart } from "@/server/cart";
import { cookies } from "next/headers";

const CartPage = async () => {
    const cookieStore = await cookies()
    const cartId = cookieStore.get('cartId')?.value || null;

    if (!cartId) {
        return <EmptyCart />;
    }

    const cart = await getCart(cartId)
    const items = cart?.items || [];

    if (items.length === 0) {
        return <EmptyCart />;
    }

    const totalPrice = cart?.items.reduce((acc, item) => acc + item.price, 0) || 0;

    return (
        <div className="container mx-auto px-4 py-4">
            <CheckoutHeader backToLink="/" buttonText="Back to Courses" title={`Shopping Cart`} />

            <div className="grid lg:grid-cols-3 gap-8">
                <CartItemsList 
                    items={items}
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
