import LessonVideo from "@/components/Dashboard/Course/LessonVideo";
import LessonSidebar from "@/components/Dashboard/Course/LessonSidebar";
import { getCourseById } from "@/server/course";

const LessonPage = async ({ params }: { params: Promise<{ courseId: string, lessonId: string }> }) => {
    const { courseId, lessonId } = await params;
    const course = await getCourseById(courseId);

    if (!course) {
        return <div>Course not found</div>;
    }

    const currentLesson = course?.modules.flatMap(module => module.lessons).find(lesson => lesson.id === lessonId);
    if (!currentLesson) {
        return <div>Lesson not found</div>;
    }

    return (
        <div className="w-full py-8">
            <h1 className="text-3xl font-bold">{currentLesson.title}</h1>
            <p>{course.title}</p>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-4 mt-4">
                <LessonVideo videoUrl={currentLesson.videoUrl} />
                <LessonSidebar modules={course.modules} currentModuleId={currentLesson.moduleId} currentLessonId={currentLesson.id} />
            </div>
        </div>
    )
}

export default LessonPage;