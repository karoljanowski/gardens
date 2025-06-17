import { getCourseById } from "@/server/course";
import EditCourse from "./EditCourse";

const EditCourseWrapper = async ({ courseId }: { courseId: string }) => {
    const course = await getCourseById(courseId);
    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div>
            <EditCourse course={course} />
        </div>
    )
}

export default EditCourseWrapper;