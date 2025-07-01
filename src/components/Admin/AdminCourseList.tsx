import { getCoursesWithLessons } from "@/server/course";
import { BookOpen, Edit, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { TCourseWithModulesAndLessons } from "@/lib/types/course";
import { Button } from "../ui/button";
import Link from "next/link";
import SectionHeader from "../Elements/SectionHeader";

const AdminCourseList = async () => {
    const courses = await getCoursesWithLessons();

    return (
        <div className="flex flex-col gap-4 my-12">
            <SectionHeader 
                icon={<BookOpen className="w-4 h-4 text-white" />}
                title="Courses"
                badgeText="course"
                count={courses.length}
            />
            <div className="flex flex-col gap-4">
                {courses.map((course) => (
                    <AdminCourseItem key={course.id} course={course} />
                ))}
                <Button asChild variant="ghost" className="w-full">
                    <Link href="/admin/course/new">
                        <Plus className="w-4 h-4" />
                        <span>Add Course</span>
                    </Link>
                </Button>
            </div>
        </div>
    )
}

const AdminCourseItem = ({ course }: { course: TCourseWithModulesAndLessons }) => {
    const lessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    return (
        <Card className="flex flex-row px-4 py-2 overflow-hidden">
            <CardHeader className="p-0 flex-1">
                <CardTitle className="flex items-center gap-4">
                    <Image className="rounded-lg w-16 h-16 object-cover" src={course.image} alt={course.title} width={100} height={100} />
                    <div className="flex flex-col">
                        <p className="text-lg font-bold">{course.title}</p>
                        <p className="text-sm text-muted-foreground font-normal">{course.subtitle}</p>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 flex-1 justify-between">
                <p className="text-sm text-muted-foreground">{course.modules.length} modules</p>
                <p className="text-sm text-muted-foreground">{lessons} lesson{lessons !== 1 ? 's' : ''}</p>
                <p className="text-sm text-muted-foreground">{course.price} $</p>
                <Button variant="secondary" size="icon" asChild>
                    <Link href={`/admin/course/${course.id}`}>
                        <Edit className="w-4 h-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}

export default AdminCourseList;