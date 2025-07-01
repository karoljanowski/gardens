import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    return (
        <div className="container mx-auto">
            <div className="bg-white rounded-xl p-12 shadow-lg flex flex-col justify-between gap-10">

                <div className="flex flex-col items-center justify-center">
                    <Image src="/hero.webp" alt="Hero" width={1400} height={500} className="w-3/4" />
                    <h1 className="text-9xl font-bold uppercase text-center">Design courses</h1>
                </div>

                <div className="flex flex-col items-start justify-center max-w-[50%]">
                    <p className="text-lg">
                        Transform your outdoor space with our expert-led courses. From beginner fundamentals to advanced techniques, unlock the skills to create stunning gardens that inspire.
                    </p>
                    <div className="flex gap-4 mt-4">
                        <Button asChild size="lg">
                            <Link href="/courses">
                                Explore courses
                                <ArrowRightIcon />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="secondary">
                            <Link href="/courses">
                                Login
                                <ArrowRightIcon />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;