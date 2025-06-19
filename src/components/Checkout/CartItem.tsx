import { Course as TCourse } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import DeleteItem from "@/components/Checkout/DeleteItem";

interface CartItemProps {
    course: TCourse;
}

const CartItem = ({ course }: CartItemProps) => {
    return (
        <Card className="p-0">
            <CardContent className="p-4">
                <div className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={`/courses/${course.image}`}
                            alt={course.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">
                            {course.title}
                        </h3>
                        <p className="text-sm text-neutral-400 truncate">
                            {course.subtitle}
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="font-bold text-white">${course.price}</p>
                        </div>
                        <DeleteItem courseId={course.id} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CartItem; 