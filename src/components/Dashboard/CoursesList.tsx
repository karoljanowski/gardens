import { getUserCourses } from "@/server/course";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Course } from "@/generated/prisma";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRightIcon, BookOpen, Clock, PlayCircleIcon } from "lucide-react";
import Link from "next/link";
import { Progress } from "../ui/progress";

type CoursesListProps = {
    userId: string;
}

const CoursesList = async ({ userId }: CoursesListProps) => {
    const courses = await getUserCourses(userId);

    return (
        <div className="w-full my-12">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Courses</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-neutral-600 to-neutral-700"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    {courses.length} course{courses.length !== 1 ? 's' : ''}
                </span>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    )
}

const CourseCard = ({ course }: { course: Course }) => {
    return (
        <Card className="p-0 pb-6 overflow-hidden">
            <Image src={`/courses/${course.image}`} alt={course.title} width={400} height={200} className="w-full h-full object-cover max-h-48" />
            <CardContent>
                <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-200 mb-4">{course.description}</p>
                <CourseProgress course={course} />
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

const CourseProgress = ({ course }: { course: Course }) => {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium">{37}%</span>
            </div>
            <Progress value={37} className="h-2" />
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{2}/{course.modules.length} modules</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>8h 30m</span>
                </div>
            </div>
        </div>
    )
}

export default CoursesList;