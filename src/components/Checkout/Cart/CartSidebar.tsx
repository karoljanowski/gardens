import OrderSummary from "../OrderSummary";
import BenefitsCard from "./BenefitsCard";

interface CartSidebarProps {
    itemCount: number;
    totalPrice: number;
}

const CartSidebar = ({ itemCount, totalPrice }: CartSidebarProps) => {
    return (
        <div className="lg:col-span-1">
            <OrderSummary itemCount={itemCount} totalPrice={totalPrice} />
            <BenefitsCard />
        </div>
    );
};

export default CartSidebar; 