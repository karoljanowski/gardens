import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

const Hero = () => {
    return (
        <div className="relative bg-linear-to-b from-[#5E7379] via-[#869BA3] to-[#7E8E95] h-screen overflow-hidden flex flex-col justify-center items-center rounded-b-3xl">
            <div className="grid grid-cols-1 grid-rows-1 justify-items-center mt-60">
                <h1 className="text-center grid-one flex flex-col uppercase font-black">
                    <span className="text-white text-4xl md:text-6xl lg:text-8xl xl:text-9xl starting:opacity-0 ending:opacity-100 duration-1000 delay-1000">Transform idea </span>
                    <span className="text-white text-3xl md:text-4xl lg:text-7xl xl:text-8xl z-10 starting:opacity-0 ending:opacity-100 duration-1000 delay-1200">into dream garden</span>
                </h1>
                <Image src="/hero.webp" alt="Hero" width={656} height={868} className="w-full h-full max-h-1/2 md:max-h-full md:max-w-2/5 object-contain grid-one starting:translate-y-200 ending:translate-y-0 duration-1000 delay-500" />
            </div>
            <div className="absolute bottom-1/12 left-0 right-0 container mx-auto px-4">
                <p className="text-white max-w-[500px] mb-4">Discover the art of creating beautiful, thriving gardens with our expert-led courses. From beginner basics to advanced landscape design, we&apos;ll guide you through every step of transforming your outdoor space into a stunning sanctuary.</p>
                <div className="flex gap-2">
                    <Button variant="default" asChild>
                        <Link href="#about">
                            Learn More
                            <ArrowRightIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                        </Link>
                    </Button>
                    <Button variant="secondary">
                        <Link href="/dashboard">
                            Login
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};


export default Hero;