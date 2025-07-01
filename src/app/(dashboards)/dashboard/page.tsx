import { getSession } from "@/server/auth";
import CoursesList from "@/components/Dashboard/CoursesList";
import { redirect } from "next/navigation";

const Dashboard = async () => {
    const session = await getSession();
    const isAdmin = session?.user?.isAdmin;

    if (!session?.user) {
        return;
    }

    if (isAdmin) {
        redirect('/admin');
    }

    return (
        <div className="py-8 w-full">
            <h1 className="text-4xl font-bold">
                Welcome back, {session.user.name}! 👋
            </h1>
            <p className="text-lg text-muted-foreground">
                Ready to continue your learning journey?
            </p>
            <CoursesList userId={session?.user?.id} />
        </div>
    )
}

export default Dashboard;