import LessonVideo from "@/components/Dashboard/LessonVideo";
import CourseContent from "@/components/Courses/CourseContent";
import { getCourseById, getUserLessonProgress } from "@/server/course";
import { getSession } from "@/server/auth";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const LessonPage = async ({ params }: { params: Promise<{ courseId: string, lessonId: string }> }) => {
    const session = await getSession();
    if (!session?.user) {
        return;
    }
    const userId = session.user.id;
    const { courseId, lessonId } = await params;
    const [course, lessonProgress] = await Promise.all([
        getCourseById(courseId),
        getUserLessonProgress(userId, courseId)
    ]);
    
    if (!course) {
        return <div>Course not found</div>;
    }

    const currentLesson = course?.modules.flatMap(module => module.lessons).find(lesson => lesson.id === lessonId);
    const isLessonCompleted = lessonProgress.some(userLessonProgress => userLessonProgress.lessonId === lessonId && userLessonProgress.completed);
    if (!currentLesson) {
        return <div>Lesson not found</div>;
    }

    return (
        <div className="w-full py-8">
            <Link href={`/dashboard/course/${courseId}`} className="flex items-center gap-2 text-muted-foreground hover:text-black">
                <ArrowLeftIcon className="w-4 h-4" />
                Back to course
            </Link>
            <h1 className="text-3xl font-bold">{currentLesson.title}</h1>
            <p>{course.title}</p>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-4 mt-4">
                <LessonVideo  videoUrl={currentLesson.videoUrl} lessonId={lessonId} userId={userId} isLessonCompleted={isLessonCompleted} />
                <CourseContent courseId={courseId} modules={course.modules} currentModuleId={currentLesson.moduleId} currentLessonId={currentLesson.id} lessonProgress={lessonProgress} />
            </div>
        </div>
    )
}

export default LessonPage;