'use client'
import { toast } from "sonner";
import { saveCourses } from "@/server/course";

const Test = () => {
    const showAlert = () => {
        toast.success('Hello');
    }
    return (
        <div>
            <button onClick={saveCourses}>Add to Cart</button>
        </div>
    )
}

export default Test;