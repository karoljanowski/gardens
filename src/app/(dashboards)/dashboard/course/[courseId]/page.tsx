import { getCourseById, getUserLessonProgress } from "@/server/course";
import CourseContent from "@/components/Dashboard/CourseContent";
import { getSession } from "@/server/auth";

const CoursePage = async ({ params }: { params: Promise<{ courseId: string }> }) => {
    const session = await getSession();
    if (!session?.user) {
        return;
    }
    const userId = session.user.id;
    const { courseId } = await params;
    const [course, lessonProgress] = await Promise.all([
        getCourseById(courseId),
        getUserLessonProgress(userId, courseId)
    ]);

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div className="py-8 w-full">
            <h1 className="text-4xl font-bold">
                {course.title}
            </h1>
            <p className="text-lg text-muted-foreground">
                {course.subtitle}
            </p>
            <div className="mt-8">
                <CourseContent courseId={courseId} modules={course.modules} lessonProgress={lessonProgress} />
            </div>
        </div>
    )
}

export default CoursePage;