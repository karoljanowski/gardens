import EditCourse from "@/components/Admin/Edit/EditCourse";
import { PlusIcon } from "lucide-react";

const AdminCoursePage = async () => {
    return (
        <div className="w-full py-8">
            <h1 className="text-4xl font-bold flex items-center gap-2">
                <PlusIcon className="w-8 h-8" /> Add Course 
            </h1>
            <p className="text-lg text-muted-foreground">
                Create a new course
            </p>
            <EditCourse />
        </div>
    )
}

export default AdminCoursePage;