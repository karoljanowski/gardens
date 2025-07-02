import CourseButton from "@/components/Courses/CourseButton";
import CourseContent from "@/components/Courses/CourseContent";
import { getCourseById } from "@/server/course";
import { formatDuration } from "@/lib/utils";
import { BookOpen, Clock, PlayCircle } from "lucide-react";
import Image from "next/image";

const CoursePage = async ({ params }: { params: Promise<{ courseId: string }> }) => {
    const { courseId } = await params;
    const course = await getCourseById(courseId);

    if (!course) {
        return <div>Course not found</div>;
    }

    // Calculate course statistics
    const totalModules = course.modules.length;
    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const totalDuration = course.modules.reduce((acc, module) => 
        acc + module.lessons.reduce((lessonAcc, lesson) => lessonAcc + lesson.duration, 0), 0
    );

    return (
        <div className="min-h-full max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
                {/* Course Image */}
                <div className="order-2 lg:order-1">
                    <Image 
                        src={course.image} 
                        alt={course.title} 
                        width={1000} 
                        height={1000} 
                        className="w-full h-auto rounded-lg shadow-lg " 
                    />
                </div>
                
                {/* Course Info */}
                <div className="order-1 lg:order-2 space-y-6">
                    <div className="space-y-4">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            {course.title}
                        </h1>
                        <p className="text-xl text-muted-foreground font-medium">
                            {course.subtitle}
                        </p>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            {course.description}
                        </p>
                        
                        {/* Course Statistics */}
                        <div className="flex flex-wrap items-center gap-6 pt-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span className="font-medium">{formatDuration(totalDuration)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <BookOpen className="w-4 h-4" />
                                <span className="font-medium">{totalModules} module{totalModules !== 1 ? 's' : ''}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <PlayCircle className="w-4 h-4" />
                                <span className="font-medium">{totalLessons} lesson{totalLessons !== 1 ? 's' : ''}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t pt-6 space-y-6">
                        <div className="bg-white rounded-lg p-4 flex flex-col justify-between items-center gap-3">
                            <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                                ${course.price}
                            </span>
                            <CourseButton course={course} className="w-full" />

                            <p className="text-xs text-muted-foreground text-center">
                                ✓ 30-day money-back guarantee ✓ Lifetime access
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Course Content */}
            <CourseContent courseId={courseId} modules={course.modules} />
        </div>
    )
}

export default CoursePage;