import { getUserCourses } from "@/server/course";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Course, UserCourse } from "@/generated/prisma";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRightIcon, BookOpen, Clock, PlayCircleIcon } from "lucide-react";
import Link from "next/link";
import { Progress } from "../ui/progress";
import { TUserCourse } from "@/lib/types/course";
import SectionHeader from "../Elements/SectionHeader";
import { TCourseWithModulesAndLessons } from "@/lib/types/course";
import { formatDuration } from "@/lib/utils";

type CoursesListProps = {
    userId: string;
}

const CoursesList = async ({ userId }: CoursesListProps) => {
    const courses = await getUserCourses(userId);

    return (
        <div className="w-full my-12">
            {/* Section Header */}
            <SectionHeader 
                icon={<BookOpen className="w-4 h-4 text-white" />}
                title="Your Courses"
                description="Your courses are listed below"
                count={courses.length}
            />

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCard key={course.course.id} userCourse={course} />
                ))}
            </div>
        </div>
    )
}

const CourseCard = ({ userCourse }: { userCourse: TUserCourse }) => {
    const {course, progress} = userCourse
    return (
        <Card className="p-0 pb-6 overflow-hidden">
            <Image src={`/courses/${course.image}`} alt={course.title} width={400} height={200} className="w-full h-full object-cover max-h-48" />
            <CardContent>
                <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-200 mb-4">{course.description}</p>
                <CourseProgress course={course} progress={progress} />
                <Button variant="secondary" asChild className="mt-4 w-full">
                    <Link href={`/dashboard/course/${course.id}`}>
                        Continue Learning
                        <PlayCircleIcon />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}

const CourseProgress = ({ course, progress }: { course: TCourseWithModulesAndLessons, progress: number }) => {
    const totalDuration = course.modules.reduce((acc, module) => acc + module.lessons.reduce((acc, lesson) => acc + lesson.duration, 0), 0);
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{course.modules.length} modules</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDuration(totalDuration)}</span>
                </div>
            </div>
        </div>
    )
}

export default CoursesList;