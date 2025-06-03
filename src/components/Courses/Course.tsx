import { type TCourse } from "@/lib/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import CourseButton from "./CourseButton";

const Course = ({ course }: { course: TCourse }) => {
    return (
        <div className="flex gap-24 my-24 even:flex-row-reverse group">
            <div className="flex-1 rounded-2xl overflow-hidden">
                <Image src={`/courses/${course.image}`} alt={course.title} width={700} height={700} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
                <div className="flex flex-col pb-8 justify-end h-full">
                    <h2 className="text-2xl font-bold uppercase">{course.title}</h2>
                    <h3 className="text-6xl font-bold">{course.subtitle}</h3>
                    <p className="text-neutral-300 mt-1">{course.description}</p>
                    <div className="flex gap-4 mt-4">
                        <CourseButton course={course} />
                        <Button variant="secondary">
                            View Course
                            <ArrowRightIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course;