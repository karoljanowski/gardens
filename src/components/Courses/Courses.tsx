import { getCourses } from "@/server/course";
import Course from "./Course";

const Courses = async () => {
    const courses = await getCourses();
    return (
        <div className="container mx-auto px-4 py-2 my-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8">
                Courses
            </h1>
            {courses.map((course) => (
                <Course key={course.id} course={course} />
            ))}
        </div>
    )
}

export default Courses;