import { Button } from "../ui/button";
import { ArrowRightIcon, LeafIcon } from "lucide-react";
import Adventages from "./Adventages";
import Image from "next/image";

const Hero = () => {
    return (
        <div className="bg-gradient-to-t from-neutral-950/10 to-emerald-900/10 -mt-28">
            <div className="relative h-screen flex items-end container mx-auto">
                <div className="absolute top-0 left-0 w-full h-full z-10">
                    <Image src="/hero7.png" alt="Hero Background" fill className="object-contain opacity-40" />
                </div>

                <div className="flex flex-col items-start px-4 pb-12 z-20">
                    <p className="text-emerald-400 uppercase flex items-center gap-2 text-lg">
                        <LeafIcon className="w-6 h-6" />
                        Learn transforming outdoor spaces
                    </p>
                    <h1 className="text-8xl leading-none font-bold uppercase mt-4">Master the Art of Garden Design</h1>
                    <p className="text-neutral-200 mt-2 text-lg max-w-[60%]">Transform your outdoor space with our expert-led courses. From beginner fundamentals to advanced techniques, unlock the skills to create stunning gardens that inspire.</p>
                    <div className="flex items-center gap-2">
                        <Button className="mt-6" size="lg">
                            Explore Courses
                            <ArrowRightIcon />
                        </Button>
                        <Button className="mt-6" variant="secondary" size="lg">
                            Login
                            <ArrowRightIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;