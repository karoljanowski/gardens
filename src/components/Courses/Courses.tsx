import { getCourses } from "@/server/course";
import Course from "./Course";
import { BookOpen } from "lucide-react";

const Courses = async () => {
    const courses = await getCourses();
    return (
        <div id="courses" className="container mx-auto px-4 py-2 my-16">
            <div className="flex flex-col items-center justify-center gap-6 text-center mb-12">  
                <div className="bg-neutral-200 rounded-full p-2">
                    <BookOpen className="w-8 h-8 text-[#88AC90]" />
                </div>
                <h2 className="text-2xl font-semibold uppercase">
                    Courses
                </h2>
            </div>
            {courses.map((course) => (
                <Course key={course.id} course={course} />
            ))}
        </div>
    )
}

export default Courses;