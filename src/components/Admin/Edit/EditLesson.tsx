"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lesson } from "@/generated/prisma";
import { TCourseWithModulesAndLessons } from "@/lib/types/course";
import { TrashIcon } from "lucide-react";

interface EditLessonProps {
    lesson: Lesson;
    moduleId: string;
    lessonIndex: number;
    moduleIndex: number;
    courseState: TCourseWithModulesAndLessons;
    setCourseState: (course: TCourseWithModulesAndLessons) => void;
    fieldErrors: Record<string, string>;
}

const EditLesson = ({ lesson, moduleId, lessonIndex, moduleIndex, courseState, setCourseState, fieldErrors }: EditLessonProps) => {
    const handleLessonChange = (field: keyof Lesson) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const updatedModules = courseState.modules.map(mod => 
            mod.id === moduleId 
                ? {
                    ...mod, 
                    lessons: mod.lessons.map(les => 
                        les.id === lesson.id 
                            ? { 
                                ...les, 
                                [field]: field === 'duration' ? parseInt(e.target.value) || 0 : e.target.value 
                            }
                            : les
                    )
                }
                : mod
        );

        setCourseState({
            ...courseState,
            modules: updatedModules
        });
    };

    const handleDeleteLesson = () => {
        const updatedModules = courseState.modules.map(mod => 
            mod.id === moduleId 
                ? {
                    ...mod, 
                    lessons: mod.lessons.filter(les => les.id !== lesson.id)
                }
                : mod
        );

        setCourseState({
            ...courseState,
            modules: updatedModules
        });
    };

    const lessonErrorKey = `modules.${moduleIndex}.lessons.${lessonIndex}`;

    return (
        <div className="bg-neutral-800 rounded-md p-3">
            <div className="flex items-center justify-between mb-3 gap-2">
                <div className="flex-1">
                    <Input
                        type="text"
                        value={lesson.title}
                        onChange={handleLessonChange('title')}
                        placeholder="Lesson title"
                    />
                    {fieldErrors[`${lessonErrorKey}.title`] && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors[`${lessonErrorKey}.title`]}</p>
                    )}
                </div>

                <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleDeleteLesson}
                    className="text-red-400 hover:text-red-300 p-1"
                >
                    <TrashIcon className="w-4 h-4" />
                </Button>

            </div>
            
            <div className="space-y-2">
                <div>
                    <Input
                        type="url"
                        value={lesson.videoUrl || ""}
                        onChange={handleLessonChange('videoUrl')}
                        placeholder="Video URL"
                    />
                    {fieldErrors[`${lessonErrorKey}.videoUrl`] && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors[`${lessonErrorKey}.videoUrl`]}</p>
                    )}
                </div>
                <div>
                    <Input
                        type="number"
                        value={lesson.duration || ""}
                        onChange={handleLessonChange('duration')}
                        placeholder="Duration (minutes)"
                    />
                    {fieldErrors[`${lessonErrorKey}.duration`] && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors[`${lessonErrorKey}.duration`]}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditLesson; 