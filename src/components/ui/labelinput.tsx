import { Label } from "@radix-ui/react-label";
import { Input } from "./input";

type LabelInputProps = {
    type: string,
    id: string,
    label: string,
    placeholder: string,
    error?: string,
    defaultValue?: string | undefined,
}

const LabelInput = ({ type, id, label, placeholder, error, defaultValue }: LabelInputProps) => {
    return (
        <div className="flex flex-col">
            <Label htmlFor={id}>{label}</Label>
            <Input
                className="mt-2"
                defaultValue={defaultValue}
                type={type}
                id={id}
                placeholder={placeholder}
                name={id}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default LabelInput;