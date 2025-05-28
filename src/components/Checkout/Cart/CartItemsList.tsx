import { TCourse } from "@/lib/types";
import CartItem from "./CartItem";

interface CartItemsListProps {
    items: TCourse[];
    onRemoveItem: (courseId: string) => void;
}

const CartItemsList = ({ items, onRemoveItem }: CartItemsListProps) => {
    return (
        <div className="lg:col-span-2 space-y-4">
            {items.map((course) => (
                <CartItem 
                    key={course.id} 
                    course={course} 
                    onRemove={onRemoveItem} 
                />
            ))}
        </div>
    );
};

export default CartItemsList; 