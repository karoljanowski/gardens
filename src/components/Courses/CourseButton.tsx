'use client';

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/useCartStore";
import { Course as TCourse } from "@prisma/client";

const CourseButton = ({ course, className }: { course: TCourse, className?: string }) => {
    const { addToCart } = useCartStore();

    return (
        <Button onClick={() => addToCart(course)} className={cn("cursor-pointer", className)}>
            Add to Cart
        </Button>
    )
}

export default CourseButton;