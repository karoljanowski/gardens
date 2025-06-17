"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TModuleWithLessons, TCourseWithModulesAndLessons } from "@/lib/types/course";
import { PlusIcon } from "lucide-react";
import EditModule from "./EditModule";

interface EditCourseContentProps {
    modules: TModuleWithLessons[];
    courseState: TCourseWithModulesAndLessons;
    setCourseState: (course: TCourseWithModulesAndLessons) => void;
    fieldErrors: Record<string, string>;
}

const EditCourseContent = ({ modules, courseState, setCourseState, fieldErrors }: EditCourseContentProps) => {
    const handleAddModule = () => {
        setCourseState({
            ...courseState,
            modules: [...courseState.modules, { id: (courseState.modules.length + 1).toString(), title: "New Module", order: courseState.modules.length + 1, courseId: courseState.id, lessons: [] }]
        });
    }

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-xl text-white">Modules</CardTitle>
                <Button variant="secondary" onClick={handleAddModule}>
                    <PlusIcon className="w-4 h-4 mr-2" /> Add Module
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {modules.map((module, index) => (
                    <EditModule 
                        key={module.id} 
                        module={module} 
                        moduleIndex={index} 
                        courseState={courseState} 
                        setCourseState={setCourseState}
                        fieldErrors={fieldErrors}
                    />
                ))}
                
                <Button 
                    variant="dashed" 
                    onClick={handleAddModule}
                    className="w-full"
                >
                    <PlusIcon className="w-4 h-4 mr-2" /> Add Module
                </Button>
            </CardContent>
        </Card>
    )
}

export default EditCourseContent; 