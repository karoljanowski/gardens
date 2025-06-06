import { getSession } from "@/server/auth";
import { getUserCourses } from "@/server/course";
import CoursesList from "@/components/Dashboard/CoursesList";

const Dashboard = async () => {
    const session = await getSession();
    if (!session?.user) {
        return;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                Welcome back, {session.user.name}! 👋
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
                Ready to continue your learning journey?
            </p>
            <CoursesList userId={session?.user?.id} />
        </div>
    )
}

export default Dashboard;