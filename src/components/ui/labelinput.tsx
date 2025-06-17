import { Label } from "@radix-ui/react-label";
import { Input } from "./input";

type LabelInputProps = {
    type: string,
    id: string,
    label: string,
    placeholder: string,
    error?: string,
    defaultValue?: string | undefined,
    value?: string | undefined,
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    inputClassName?: string,
}

const LabelInput = ({ type, id, label, placeholder, error, defaultValue, value, onChange, inputClassName }: LabelInputProps) => {
    return (
        <div className="flex flex-col">
            <Label htmlFor={id}>{label}</Label>
            <Input
                className={`mt-2 ${inputClassName}`}
                defaultValue={defaultValue}
                value={value}
                type={type}
                id={id}
                placeholder={placeholder}
                name={id}
                onChange={onChange}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default LabelInput;