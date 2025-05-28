import { TCourse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Trash2, BookOpen } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
    course: TCourse;
    onRemove: (courseId: string) => void;
}

const CartItem = ({ course, onRemove }: CartItemProps) => {
    return (
        <Card className="p-0">
            <CardContent className="p-4">
                <div className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={course.image}
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
                        {course.modules && course.modules.length > 0 && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center gap-1 mt-1 text-sm text-neutral-300 w-fit">
                                            <BookOpen className="w-3 h-3" />
                                            <span>{course.modules.length} modules</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent align="start" side="bottom">
                                        <div className="max-w-xs">
                                            <p className="font-medium mb-2">Course Modules:</p>
                                            <div className="space-y-1">
                                                {course.modules.map((module, index) => (
                                                    <div key={index} className="text-sm">
                                                        {index + 1}. {module}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="font-bold text-white">${course.price}</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemove(course.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CartItem; 