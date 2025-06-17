import prisma from "@/lib/prisma";
import { isAdmin } from "@/server/admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
    const admin = await isAdmin();
    if (!admin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { courseId } = await params;

    if (!courseId) {
        return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    try {
        const course = await prisma.course.findUnique({
            where: {
                id: courseId
            },
            include: {
                modules: {
                    include: {
                        lessons: true
                    }
                }
            }
        });

        return NextResponse.json(course);
    } catch (error: unknown) {
        console.error('Error fetching course:', error);
        return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 });
    }
}