import { Course as TCourse } from "@prisma/client";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import CourseButton from "./CourseButton";
import Link from "next/link";

const Course = ({ course }: { course: TCourse }) => {
    return (
        <div className="flex flex-col md:flex-row gap-6 md:gap-24 mb-8 md:mb-12 lg:mb-16 md:even:flex-row-reverse group">
            <div className="flex-1 rounded-2xl overflow-hidden">
                <Image src={course.image} alt={course.title} width={700} height={700} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
                <div className="flex flex-col pb-4 lg:pb-8 justify-end h-full">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold uppercase">{course.title}</h2>
                    <h3 className="text-3xl sm:text-4xl lg:text-6xl font-bold">{course.subtitle}</h3>
                    <p className="text-muted-foreground mt-1 text-sm sm:text-base">{course.description}</p>
                    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mt-4">
                        <CourseButton course={course} />
                        <Button variant="tertiary" className="text-sm lg:text-base cursor-pointer" asChild>
                            <Link href={`/course/${course.id}`}>
                                View Course
                                <ArrowRightIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course;