import Loader from "@/components/ui/loader";
import { ShoppingBagIcon } from "lucide-react";

const CartLoading = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto flex flex-col items-center justify-center">
                <Loader />
                <p className="text-2xl font-bold text-white mb-2 mt-8 flex items-center gap-2">
                    <ShoppingBagIcon className="w-6 h-6" />
                    Loading your cart...
                </p>
                <p className="text-neutral-300">
                    Please wait while we load your course selections.
                </p>
            </div>
        </div>
    );
};

export default CartLoading; 