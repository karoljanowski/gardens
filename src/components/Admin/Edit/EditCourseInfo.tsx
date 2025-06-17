"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TCourseWithModulesAndLessons } from "@/lib/types/course";
import LabelInput from "@/components/ui/labelinput";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface EditCourseInfoProps {
    course: TCourseWithModulesAndLessons;
    setCourseState: (course: TCourseWithModulesAndLessons) => void;
    fieldErrors: Record<string, string>;
}

const EditCourseInfo = ({ course, setCourseState, fieldErrors }: EditCourseInfoProps) => {
    
    const handleInputChange = (field: keyof TCourseWithModulesAndLessons) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setCourseState({
            ...course,
            [field]: field === 'price' || field === 'order' ? parseFloat(e.target.value) || 0 : e.target.value
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Course Information</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <LabelInput 
                            type="text" 
                            id="title" 
                            label="Course Title" 
                            placeholder="Enter course title" 
                            value={course.title}
                            onChange={handleInputChange('title')}
                            error={fieldErrors['title']}
                        />
                        <LabelInput 
                            type="text" 
                            id="subtitle" 
                            label="Course Subtitle" 
                            placeholder="Enter course subtitle" 
                            value={course.subtitle}
                            onChange={handleInputChange('subtitle')}
                            error={fieldErrors['subtitle']}
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <LabelInput 
                            type="number" 
                            id="order" 
                            label="Course Order" 
                            placeholder="1" 
                            value={course.order?.toString() || ""}
                            onChange={handleInputChange('order')}
                            error={fieldErrors['order']}
                        />
                        <LabelInput 
                            type="number" 
                            id="price" 
                            label="Price ($)" 
                            placeholder="0.00" 
                            value={course.price.toString()}
                            onChange={handleInputChange('price')}
                            error={fieldErrors['price']}
                        />
                        <LabelInput 
                            type="url" 
                            id="image" 
                            label="Thumbnail URL" 
                            placeholder="Enter image URL" 
                            value={course.image}
                            onChange={handleInputChange('image')}
                            error={fieldErrors['image']}
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter course description"
                            value={course.description}
                            onChange={handleInputChange('description')}
                            className="mt-2 min-h-32"
                        />
                        {fieldErrors['description'] && (
                            <p className="text-red-500 text-sm mt-1">{fieldErrors['description']}</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default EditCourseInfo; 