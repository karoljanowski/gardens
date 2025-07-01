import { EditIcon } from "lucide-react";
import EditCourseWrapper from "@/components/Admin/Edit/EditCourseWrapper";
import { Suspense } from "react";

const AdminCoursePage = async ({ params }: { params: Promise<{ courseId: string }> }) => {
    const { courseId } = await params;

    return (
        <div className="w-full py-8">
            <h1 className="text-4xl font-bold flex items-center gap-2">
                <EditIcon className="w-8 h-8" /> Edit Course 
            </h1>
            <p className="text-lg text-muted-foreground">
                Update course details, modules, and lessons
            </p>
            <Suspense fallback={<div>Loading...</div>}>
                <EditCourseWrapper courseId={courseId} />
            </Suspense>
        </div>
    )
}

export default AdminCoursePage;