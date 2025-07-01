import { isAdmin } from "@/server/admin";
import { Settings } from "lucide-react";
import AdminCourseList from "@/components/Admin/AdminCourseList";
import { redirect } from "next/navigation";

const Admin = async () => {
    const admin = await isAdmin();
    if (!admin) {
        redirect("/dashboard");
    }

    return (
        <div className="w-full py-8">
            <h1 className="text-4xl font-bold flex items-center gap-2">
                <Settings className="w-8 h-8" /> Admin Panel 
            </h1>
            <p className="text-lg text-muted-foreground">
                Manage your courses and lessons
            </p>
            <AdminCourseList />
        </div>
    )
}

export default Admin;