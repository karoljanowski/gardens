'use client'
import { toast } from "sonner";

const Test = () => {
    const showAlert = () => {
        toast.success('Hello');
    }
    return (
        <div>
            <button onClick={showAlert}>Add to Cart</button>
        </div>
    )
}

export default Test;