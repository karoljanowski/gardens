"use client";
import { Button } from "@/components/ui/button";
import { TCourseWithModulesAndLessons } from "@/lib/types/course";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import EditCourseInfo from "./EditCourseInfo";
import EditCourseContent from "./EditCourseContent";
import { saveCourse } from "@/server/course";
import { toast } from "sonner";

const EditCourse = ({ course }: { course?: TCourseWithModulesAndLessons }) => {
    const [courseState, setCourseState] = useState<TCourseWithModulesAndLessons>(course || {
        id: '',
        title: '',
        subtitle: '',
        description: '',
        image: '',
        modules: [],
        order: 0,
        price: 0
    });
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSave = () => {
        startTransition(async () => {
            const response = await saveCourse(courseState);

            if (response.success) {
                toast.success('Course saved successfully');
                setFieldErrors({});
                router.push('/admin');
            } else {
                if (response.fieldErrors) {
                    setFieldErrors(response.fieldErrors);
                    
                    // Extract and show specific validation messages
                    const errors = response.fieldErrors;
                    
                    // Check for course-level module requirement
                    if (errors['modules'] && errors['modules'].includes('at least one module')) {
                        toast.error('Course must have at least one module');
                        return;
                    }
                    
                    // Check for module-level lesson requirements
                    const lessonErrors = Object.keys(errors).filter(key => 
                        key.includes('.lessons') && errors[key].includes('at least one lesson')
                    );
                    
                    if (lessonErrors.length > 0) {
                        lessonErrors.forEach(key => {
                            const moduleIndex = key.split('.')[1];
                            const moduleNumber = parseInt(moduleIndex) + 1;
                            toast.error(`Module ${moduleNumber} must have at least one lesson`);
                        });
                        return;
                    }
                    
                    toast.error('Please fix the validation errors');
                } else {
                    toast.error(response.error || 'Failed to save course');
                }
            }
        });
    };

    const handleCancel = () => {
        router.push('/admin');
    };

    return (
        <div className="flex flex-col gap-4 my-6">
            <EditCourseInfo 
                course={courseState} 
                setCourseState={setCourseState}
                fieldErrors={fieldErrors}
            />
            <EditCourseContent 
                modules={courseState.modules} 
                courseState={courseState} 
                setCourseState={setCourseState}
                fieldErrors={fieldErrors}
            />
            
            <div className="flex justify-end gap-2">
                <Button type="button" variant="tertiary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button type="button" variant="default" onClick={handleSave} disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </div>
    )
}

export default EditCourse;