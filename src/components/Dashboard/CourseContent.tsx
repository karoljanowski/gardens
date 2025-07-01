import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TModuleWithLessons } from "@/lib/types/course";
import { Lesson, UserLessonProgress as TUserLessonProgress } from "@prisma/client";
import { CheckCircleIcon, FolderIcon, PlayCircleIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type CourseContentProps = {
    courseId: string;
    modules: TModuleWithLessons[];
    currentModuleId?: string;
    currentLessonId?: string;
    lessonProgress: TUserLessonProgress[];
}

const CourseContent = ({ courseId, modules, currentModuleId, currentLessonId, lessonProgress }: CourseContentProps) => {
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Course Content</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" className="w-full" defaultValue={currentModuleId} collapsible>
                    {modules.map((module) => (
                        <CourseContentModule key={module.id} courseId={courseId} module={module} currentLessonId={currentLessonId} lessonProgress={lessonProgress} />
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    )
}

type CourseContentModuleProps = {
    courseId: string;
    module: TModuleWithLessons;
    currentLessonId?: string;
    lessonProgress: TUserLessonProgress[];
}

const CourseContentModule = ({ courseId, module, currentLessonId, lessonProgress }: CourseContentModuleProps) => {
    return (
        <AccordionItem value={module.id} >
            <AccordionTrigger className="items-center hover:bg-gray-300/50 py-1 pr-2 hover:no-underline">
                <div className="flex gap-2 items-center">
                    <div className="flex items-center bg-gray-300 rounded-md p-2">
                        <FolderIcon className="w-4 h-4 text-gray-800" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-medium">{module.title}</p>
                        <p className="text-xs text-muted-foreground">{module.lessons.length} lessons</p>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-col gap-2 ml-6 mt-2">
                    {module.lessons.map((lesson) => (
                        <LessonSidebarLesson key={lesson.id} courseId={courseId} lesson={lesson} currentLesson={currentLessonId === lesson.id} lessonProgress={lessonProgress} />
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

type LessonSidebarLessonProps = {
    courseId: string;
    lesson: Lesson;
    currentLesson?: boolean;
    lessonProgress: TUserLessonProgress[];
}

const LessonSidebarLesson = ({ courseId, lesson, currentLesson, lessonProgress }: LessonSidebarLessonProps) => {
    const lessonCompleted = lessonProgress.some((progress) => progress.lessonId === lesson.id && progress.completed);
    return (
        <Link href={`/dashboard/course/${courseId}/${lesson.id}`} className="flex gap-2 items-center rounded-md hover:bg-gray-300/50">
            <div className={cn("flex items-center bg-gray-300 rounded-md p-2", currentLesson && "bg-yellow-500", lessonCompleted && "bg-green-500")}>
                {lessonCompleted ? <CheckCircleIcon className="w-4 h-4 text-white" /> : <PlayCircleIcon className={cn("w-4 h-4 text-gray-800", currentLesson && "text-white")} />}
            </div>
            <div className="flex flex-col">
                <p className="text-sm text-muted-foreground">{lesson.title}</p>
                <p className="text-xs text-muted-foreground">{lesson.duration} minutes</p>
            </div>
        </Link>
    )
}

export default CourseContent;