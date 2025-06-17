import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TModuleWithLessons } from "@/lib/types/course";
import { Lesson } from "@prisma/client";
import { FolderIcon, PlayCircleIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LessonSidebar = ({ modules, currentModuleId, currentLessonId }: { modules: TModuleWithLessons[], currentModuleId: string, currentLessonId: string }) => {
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Course Content</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" className="w-full" defaultValue={currentModuleId}>
                    {modules.map((module) => (
                        <LessonSidebarModule key={module.id} module={module} currentLessonId={currentLessonId} />
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    )
}

const LessonSidebarModule = ({ module, currentLessonId }: { module: TModuleWithLessons, currentLessonId: string }) => {
    return (
        <AccordionItem value={module.id} >
            <AccordionTrigger className="items-center hover:bg-neutral-800/50 py-0 pr-2">
                <div className="flex gap-2 items-center">
                    <div className="flex items-center bg-neutral-800 rounded-md p-2">
                        <FolderIcon className="w-4 h-4 text-neutral-400" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-medium">{module.title}</p>
                        <p className="text-xs text-neutral-400">{module.lessons.length} lessons</p>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-col gap-2 ml-6 mt-4">
                    {module.lessons.map((lesson) => (
                        <LessonSidebarLesson key={lesson.id} lesson={lesson} currentLesson={currentLessonId === lesson.id} />
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

const LessonSidebarLesson = ({ lesson, currentLesson }: { lesson: Lesson, currentLesson: boolean }) => {
    return (
        <Link href={`${lesson.id}`} className="flex gap-2 items-center rounded-md hover:bg-neutral-800/50">
            <div className={cn("flex items-center bg-neutral-800 rounded-md p-2", currentLesson && "bg-yellow-500/50")}>
                <PlayCircleIcon className={cn("w-4 h-4 text-neutral-400", currentLesson && "text-white")} />
            </div>
            <div className="flex flex-col">
                <p className="text-sm text-neutral-300">{lesson.title}</p>
                <p className="text-xs text-neutral-400">{lesson.duration} minutes</p>
            </div>
        </Link>
    )
}

export default LessonSidebar;