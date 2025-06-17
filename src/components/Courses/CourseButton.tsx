'use client';

import { Button } from "../ui/button";
import { useCartStore } from "@/stores/useCartStore";
import { TCourse } from "@/lib/types/types";

const CourseButton = ({ course }: { course: TCourse }) => {
    const { addToCart } = useCartStore();

    return (
        <Button onClick={() => addToCart(course)}>
            Add to Cart
        </Button>
    )
}

export default CourseButton;