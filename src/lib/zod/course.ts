import z from "zod";

const LessonSchema = z.object({
    id: z.string(),
    title: z.string().min(1, "Lesson title is required"),
    videoUrl: z.string().url("Video URL must be a valid URL").min(1, "Video URL is required"),
    duration: z.number().min(1, "Duration is required and must be greater than 0"),
    order: z.number().min(1, "Lesson order must be 1 or greater"),
    moduleId: z.string()
});

const ModuleSchema = z.object({
    id: z.string(),
    title: z.string().min(1, "Module title is required"),
    order: z.number().min(1, "Module order must be 1 or greater"),
    courseId: z.string(),
    lessons: z.array(LessonSchema).min(1, "Module must have at least one lesson")
});

export const CourseSchema = z.object({
    id: z.string(),
    order: z.number().min(1, "Course order must be 1 or greater"),
    title: z.string().min(1, "Course title is required"),
    subtitle: z.string().min(1, "Course subtitle is required"),
    description: z.string().min(1, "Course description is required"),
    // image: z.string().url("Course image must be a valid URL"),
    price: z.number().min(0, "Price must be 0 or greater"),
    modules: z.array(ModuleSchema).min(1, "Course must have at least one module")
}).refine((data) => {
    // Check for unique module orders
    const moduleOrders = data.modules.map(m => m.order);
    const uniqueOrders = new Set(moduleOrders);
    return uniqueOrders.size === moduleOrders.length;
}, {
    message: "Module orders must be unique"
}).refine((data) => {
    // Check for unique lesson orders within each module
    for (const courseModule of data.modules) {
        const lessonOrders = courseModule.lessons.map(l => l.order);
        const uniqueOrders = new Set(lessonOrders);
        if (uniqueOrders.size !== lessonOrders.length) {
            return false;
        }
    }
    return true;
}, {
    message: "Lesson orders must be unique within each module"
});