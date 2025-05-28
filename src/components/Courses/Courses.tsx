import { getCourses } from "@/server/course";
import Course from "./Course";

const Courses = async () => {
    const courses = await getCourses();
    return (
        <div className="container mx-auto px-4 py-2">
            {courses.map((course) => (
                <Course key={course.id} course={course} />
            ))}
        </div>
    )
}

export default Courses;