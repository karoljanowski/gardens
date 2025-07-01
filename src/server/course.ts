'use server';
import prisma from "@/lib/prisma";
import { TCourseWithModulesAndLessons } from "@/lib/types/course";
import { cache } from "react";
import { CourseSchema } from "@/lib/zod/course";

// GET
export const getCourses = cache(async () => {
    const courses = await prisma.course.findMany();
    return courses;
});

export const getUserCourses = async (userId: string) => {
    const courses = await prisma.userCourse.findMany({
        where: {
            userId: userId
        },
        include: {
            course: {
              include: {
                modules: {
                  include: {
                    lessons: true
                  }
                }
              }
            }
        }
    });
    return courses;
};

export const getUserLessonProgress = async (userId: string, courseId: string) => {
    const progress = await prisma.userLessonProgress.findMany({
        where: {
            userId: userId,
            lesson: {
                module: {
                    courseId: courseId
                }
            }
        }
    });
    return progress;
}

export const getCoursesWithLessons = async () => {
    const courses = await prisma.course.findMany({
        include: {
            modules: {
              include: {
                lessons: true
              }
            }
        }
    });
    return courses;
}

export const getCourseById = async (courseId: string) => {
    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
            modules: {
                include: {
                    lessons: true
                }
            }
        }
    });
    return course;
}

// SAVE
export const saveCourse = async (course: TCourseWithModulesAndLessons) => {
    try {
        const validation = CourseSchema.safeParse(course);

        if (!validation.success) {
            const fieldErrors: Record<string, string> = {};
            
            validation.error.errors.forEach(error => {
                const path = error.path.join('.');
                
                fieldErrors[path] = error.message;
            });
            
            return { 
                success: false, 
                error: 'Validation failed', 
                fieldErrors 
            };
        }

        await prisma.$transaction(async (tx) => {
            // Check if course exists
            const existingCourse = await tx.course.findUnique({
                where: { id: course.id },
                include: {
                    modules: {
                        include: {
                            lessons: true
                        }
                    }
                }
            });

            if (existingCourse) {
                // UPDATE EXISTING COURSE
                await tx.course.update({
                    where: { id: course.id },
                    data: {
                        order: course.order,
                        title: course.title,
                        subtitle: course.subtitle,
                        description: course.description,
                        image: course.image,
                        price: course.price
                    }
                });

                const existingModuleIds = existingCourse.modules.map(m => m.id);
                const newModuleIds = course.modules.map(m => m.id);

                // Delete modules that are no longer present
                const modulesToDelete = existingModuleIds.filter(id => !newModuleIds.includes(id));
                if (modulesToDelete.length > 0) {
                    await tx.module.deleteMany({
                        where: {
                            id: { in: modulesToDelete }
                        }
                    });
                }

                // Process each module
                for (const courseModule of course.modules) {
                    const existingModule = existingCourse.modules.find(m => m.id === courseModule.id);
                    
                    if (existingModule) {
                        // Update existing module
                        await tx.module.update({
                            where: { id: courseModule.id },
                            data: {
                                title: courseModule.title,
                                order: courseModule.order
                            }
                        });

                        // Handle lessons for this module
                        const existingLessonIds = existingModule.lessons.map(l => l.id);
                        const newLessonIds = courseModule.lessons.map(l => l.id);

                        // Delete lessons that are no longer present
                        const lessonsToDelete = existingLessonIds.filter(id => !newLessonIds.includes(id));
                        if (lessonsToDelete.length > 0) {
                            await tx.lesson.deleteMany({
                                where: {
                                    id: { in: lessonsToDelete }
                                }
                            });
                        }

                        // Process each lesson
                        for (const lesson of courseModule.lessons) {
                            const existingLesson = existingModule.lessons.find(l => l.id === lesson.id);
                            
                            if (existingLesson) {
                                // Update existing lesson
                                await tx.lesson.update({
                                    where: { id: lesson.id },
                                    data: {
                                        title: lesson.title,
                                        videoUrl: lesson.videoUrl,
                                        duration: lesson.duration,
                                        order: lesson.order
                                    }
                                });
                            } else {
                                // Create new lesson (for lessons with temp IDs)
                                await tx.lesson.create({
                                    data: {
                                        title: lesson.title,
                                        videoUrl: lesson.videoUrl,
                                        duration: lesson.duration,
                                        order: lesson.order,
                                        moduleId: courseModule.id
                                    }
                                });
                            }
                        }
                    } else {
                        // Create new module (for modules with temp IDs)
                        const createdModule = await tx.module.create({
                            data: {
                                title: courseModule.title,
                                order: courseModule.order,
                                courseId: course.id
                            }
                        });

                        // Create lessons for the new module
                        for (const lesson of courseModule.lessons) {
                            await tx.lesson.create({
                                data: {
                                    title: lesson.title,
                                    videoUrl: lesson.videoUrl,
                                    duration: lesson.duration,
                                    order: lesson.order,
                                    moduleId: createdModule.id
                                }
                            });
                        }
                    }
                }
            } else {
                // CREATE NEW COURSE
                const createdCourse = await tx.course.create({
                    data: {
                        order: course.order,
                        title: course.title,
                        subtitle: course.subtitle,
                        description: course.description,
                        image: course.image,
                        price: course.price
                    }
                });

                // Create modules and lessons for new course
                for (const courseModule of course.modules) {
                    const createdModule = await tx.module.create({
                        data: {
                            title: courseModule.title,
                            order: courseModule.order,
                            courseId: createdCourse.id
                        }
                    });

                    // Create lessons for the module
                    for (const lesson of courseModule.lessons) {
                        await tx.lesson.create({
                            data: {
                                title: lesson.title,
                                videoUrl: lesson.videoUrl,
                                duration: lesson.duration,
                                order: lesson.order,
                                moduleId: createdModule.id
                            }
                        });
                    }
                }
            }
        });

        return { success: true };
    } catch (error) {
        console.error('Error saving course:', error);
        return { success: false, error: 'Failed to save course' };
    }
}