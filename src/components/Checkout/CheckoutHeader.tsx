import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CheckoutHeaderProps {
    backToLink: string;
    buttonText: string;
    title: string;
}

const CheckoutHeader = ({ backToLink, buttonText, title }: CheckoutHeaderProps) => {
    return (
        <div className="flex flex-col gap-4 mb-8">
            <Link href={backToLink}>
                <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {buttonText}
                </Button>
            </Link>
            <h1 className="text-3xl font-bold">{title}</h1>
        </div>
    );
};

export default CheckoutHeader; 