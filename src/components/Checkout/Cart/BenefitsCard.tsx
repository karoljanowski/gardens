import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BenefitsCard = () => {
    const benefits = [
        "Lifetime access to all course materials",
        "Expert instructor support",
        "Mobile and desktop access",
        "30-day money-back guarantee"
    ];

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle className="text-lg">Why Choose Our Courses?</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-white">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {benefit}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default BenefitsCard; 