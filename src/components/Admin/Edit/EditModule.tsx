"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TModuleWithLessons, TCourseWithModulesAndLessons } from "@/lib/types/course";
import { PlusIcon, TrashIcon } from "lucide-react";
import EditLesson from "./EditLesson";
import LabelInput from "@/components/ui/labelinput";

interface EditModuleProps {
    module: TModuleWithLessons;
    moduleIndex: number;
    courseState: TCourseWithModulesAndLessons;
    setCourseState: (course: TCourseWithModulesAndLessons) => void;
    fieldErrors: Record<string, string>;
}

const EditModule = ({ module, moduleIndex, courseState, setCourseState, fieldErrors }: EditModuleProps) => {
    const handleAddLesson = () => {
        const newLesson = {
            id: `lesson_${Date.now()}`,
            title: "New Lesson",
            videoUrl: "",
            order: module.lessons.length + 1,
            moduleId: module.id,
            duration: 0
        };

        const updatedModules = courseState.modules.map(mod => 
            mod.id === module.id 
                ? { ...mod, lessons: [...mod.lessons, newLesson] }
                : mod
        );

        setCourseState({
            ...courseState,
            modules: updatedModules
        });
    };

    const handleModuleTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const updatedModules = courseState.modules.map(mod => 
            mod.id === module.id 
                ? { ...mod, title: e.target.value }
                : mod
        );

        setCourseState({
            ...courseState,
            modules: updatedModules
        });
    };

    const handleDeleteModule = () => {
        const updatedModules = courseState.modules.filter(mod => mod.id !== module.id);
        setCourseState({
            ...courseState,
            modules: updatedModules
        });
    };

    const moduleErrorKey = `modules.${moduleIndex}`;

    return (
        <div className="bg-neutral-900 rounded-lg">
            <Accordion type="single" collapsible defaultValue={module.id}>
                <AccordionItem value={module.id} className="border-none">
                    <AccordionTrigger className="px-4 py-3 text-white hover:no-underline flex items-center justify-between">

                        <div 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteModule();
                            }}
                            className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-neutral-800 cursor-pointer transition-colors"
                        >
                            <TrashIcon className="w-4 h-4" />
                        </div>
                        <span className="text-left mr-auto">Module {moduleIndex + 1}: {module.title}</span>

                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-4 border-t border-neutral-800">
                        <div className="space-y-4">
                            {/* Module Title Input */}
                        
                            <LabelInput
                                type="text"
                                id={`module-${module.id}`}
                                label="Module Title"
                                placeholder="Enter module title"
                                value={module.title}
                                onChange={handleModuleTitleChange}
                                inputClassName="bg-neutral-800"
                                error={fieldErrors[`${moduleErrorKey}.title`]}
                            />
                            {/* Lessons Section */}
                            <div>
                                <p>Lessons</p>
                                <div className="mt-2 space-y-3">
                                    {module.lessons.map((lesson, lessonIndex) => (
                                        <EditLesson 
                                            key={lesson.id} 
                                            lesson={lesson} 
                                            moduleId={module.id}
                                            lessonIndex={lessonIndex}
                                            courseState={courseState} 
                                            setCourseState={setCourseState}
                                            fieldErrors={fieldErrors}
                                            moduleIndex={moduleIndex}
                                        />
                                    ))}
                                    
                                    <Button 
                                        variant="dashed" 
                                        onClick={handleAddLesson}
                                        className="w-full hover:bg-neutral-800"
                                    >
                                        <PlusIcon className="w-4 h-4 mr-2" /> Add Lesson
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default EditModule; 