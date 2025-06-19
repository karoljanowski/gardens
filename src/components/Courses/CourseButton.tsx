'use client';

import { Button } from "../ui/button";
import { useCartStore } from "@/stores/useCartStore";
import { Course as TCourse } from "@prisma/client";

const CourseButton = ({ course }: { course: TCourse }) => {
    const { addToCart } = useCartStore();

    return (
        <Button onClick={() => addToCart(course)}>
            Add to Cart
        </Button>
    )
}

export default CourseButton;