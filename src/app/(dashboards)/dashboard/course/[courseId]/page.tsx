import { getCourseById } from "@/server/course";

const CoursePage = async ({ params }: { params: Promise<{ courseId: string }> }) => {
    const { courseId } = await params;
    const course = await getCourseById(courseId);

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div>
            <h1>List of modules and lessons</h1>
        </div>
    )
}

export default CoursePage;