import { ArrowRightIcon, SproutIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const About = () => {
    return (
        <div id="about" className="container max-w-5xl mx-auto px-4 py-2 my-16">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
                <div className="bg-neutral-200 rounded-full p-2">
                    <SproutIcon className="w-8 h-8 text-[#88AC90]" />
                </div>
                <h2 className="text-2xl font-semibold uppercase">
                    About us
                </h2>
                <p className="text-muted-foreground font-medium">
                    Welcome to Gardens, your premier destination for mastering the art of garden design and cultivation. <span className="text-neutral-500">Our comprehensive courses guide you through every aspect of creating stunning outdoor spaces, from understanding soil composition and plant selection to designing harmonious landscapes that thrive year-round.</span> Whether you&apos;re a complete beginner dreaming of your first garden or an experienced gardener looking to refine your skills, <span className="text-neutral-500">our expert-led programs provide the knowledge and confidence you need to transform any space into a flourishing paradise.</span>
                </p>
                <Button variant="tertiary" asChild>
                    <Link href="#courses">
                        See courses
                        <ArrowRightIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default About;