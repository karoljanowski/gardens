'use server';

import prisma from "@/lib/prisma";

export const completeLesson = async (lessonId: string, userId: string) => {
    const existingProgress = await prisma.userLessonProgress.findFirst({
        where: {
            userId: userId,
            lessonId: lessonId
        }
    });

    if (existingProgress) return;
    
    await prisma.userLessonProgress.create({
        data: {
            userId: userId,
            lessonId: lessonId,
            completed: true
        }
    });
}