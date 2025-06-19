import { create } from "zustand";
import { Course as TCourse } from "@prisma/client";
import { addToCart, removeFromCart } from "@/server/cart";
import { toast } from "sonner";

type CartState = {
    items: TCourse[];
    addToCart: (course: TCourse) => void;
    removeFromCart: (courseId: string) => void;
    setCart: (cart: TCourse[]) => void;
    getTotalPrice: () => number;
    initialized: boolean;
};

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    initialized: false,

    addToCart: async (course: TCourse) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.id === course.id);
        
        if (existingItem) {
            toast.error('Course is already in cart');
            return;
        }

        set({ items: [...currentItems, course] });
        toast.success('Added to cart');

        try {
            await addToCart(course.id);
        } catch {
            toast.error('Oops! Something went wrong while adding to cart');
            set({ items: currentItems });
        }
    },

    removeFromCart: async (courseId: string) => {
        const currentItems = get().items;
        const newItems = currentItems.filter(item => item.id !== courseId);

        set({ items: newItems });
        toast.success('Removed from cart');

        try {
            await removeFromCart(courseId);
        } catch {
            toast.error('Oops! Something went wrong while removing from cart');
            set({ items: currentItems });
        }
    },

    setCart: (cart: TCourse[]) => {
        set({ items: cart });
        set({ initialized: true });
    },

    getTotalPrice: () => {
        return get().items.reduce((total, course) => total + course.price, 0);
    }
}));
