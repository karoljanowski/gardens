import { EditIcon } from "lucide-react";
import EditCourseWrapper from "@/components/Admin/Edit/EditCourseWrapper";
import { Suspense } from "react";

const AdminCoursePage = async ({ params }: { params: { courseId: string } }) => {
    const { courseId } = await params;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <EditIcon className="w-8 h-8" /> Edit Course 
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
                Update course details, modules, and lessons
            </p>
            <Suspense fallback={<div>Loading...</div>}>
                <EditCourseWrapper courseId={courseId} />
            </Suspense>
        </div>
    )
}

export default AdminCoursePage;