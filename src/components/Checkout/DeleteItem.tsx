'use client';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";

const DeleteItem = ({ courseId }: { courseId: string }) => {
    const { removeFromCart } = useCartStore();

    return (
        <Button
        variant="ghost"
        size="sm"
        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
        type="submit"
        onClick={() => removeFromCart(courseId)}
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}

export default DeleteItem;