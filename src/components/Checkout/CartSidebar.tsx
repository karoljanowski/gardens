import OrderSummary from "@/components/Checkout/OrderSummary";
import BenefitsCard from "@/components/Checkout/BenefitsCard";
import { Session } from "better-auth";

interface CartSidebarProps {
    itemCount: number;
    totalPrice: number;
    session: Session | null;
}

const CartSidebar = ({ itemCount, totalPrice, session }: CartSidebarProps) => {
    return (
        <div className="lg:col-span-1">
            <OrderSummary itemCount={itemCount} totalPrice={totalPrice} session={session} />
            <BenefitsCard />
        </div>
    );
};

export default CartSidebar; 