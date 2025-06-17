import { create } from "zustand";
import { TCartCourse } from "@/lib/types/cart";  
import { addToCart, removeFromCart } from "@/server/cart";
import { toast } from "sonner";

type CartState = {
    items: TCartCourse[];
    isLoading: boolean;
    addToCart: (courseId: string) => void;
    removeFromCart: (courseId: string) => void;
    getCart: () => Promise<void>;
    getTotalPrice: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    isLoading: true,

    addToCart: async (courseId: string) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.id === courseId);
        
        if (existingItem) {
            toast.error('Course is already in cart');
            return;
        }

        try {
            const cart = await addToCart(courseId);
            if (cart) {
                set({ items: cart.items });
                toast.success('Added to cart');
            }
        } catch (error) {
            toast.error('Failed to add to cart');
            console.error('Failed to add to cart:', error);
        }
    },

    removeFromCart: async (courseId: string) => {
        try {
            const cart = await removeFromCart(courseId);
            if (cart) {
                set({ items: cart.items });
                toast.success('Removed from cart');
            }
        } catch (error) {
            toast.error('Failed to remove from cart');
            console.error('Failed to remove from cart:', error);
        }
    },

    getCart: async () => {
        try {
            const res = await fetch("/api/cart")
            const cart = await res.json()

            if (cart?.items) {
                set({ items: cart.items, isLoading: false });
            } else {
                set({ items: [], isLoading: false });
            }
        } catch (error) {
            toast.error('Failed to initialize cart');
            console.error('Failed to get cart:', error);
            set({ items: [], isLoading: false });
        }
    },

    getTotalPrice: () => {
        return get().items.reduce((total, course) => total + course.price, 0);
    }
}));
