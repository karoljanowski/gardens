'use server';
import prisma from "@/lib/prisma";

export const getCourses = async () => {
    "use cache";
    const courses = await prisma.course.findMany();
    return courses;
}