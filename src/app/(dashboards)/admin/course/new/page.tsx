import EditCourse from "@/components/Admin/Edit/EditCourse";
import { EditIcon, PlusIcon } from "lucide-react";

const AdminCoursePage = async () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PlusIcon className="w-8 h-8" /> Add Course 
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
                Create a new course
            </p>
            <EditCourse />
        </div>
    )
}

export default AdminCoursePage;