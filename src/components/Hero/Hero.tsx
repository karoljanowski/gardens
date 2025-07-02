import { Button } from "../ui/button";
import { ArrowRightIcon, BookOpenIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg flex flex-col justify-between gap-10">

                <div className="flex flex-col items-center justify-center">
                    <Image src="/hero.webp" alt="Hero" width={1419} height={537} className="w-full md:w-3/4 z-20" />
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase text-center">Design courses</h1>
                </div>

                <div className="flex flex-col items-start justify-center lg:max-w-[50%]">
                    <div className="flex items-center flex-wrap gap-2 mb-4">
                        <span className="text-sm text-muted-foreground bg-secondary rounded-full px-4 py-1 flex items-center gap-2 text-nowrap">
                            <UsersIcon size={14} />
                            Trusted by 10,000+ gardeners
                        </span>
                        <span className="text-sm text-muted-foreground bg-secondary rounded-full px-4 py-1 flex items-center gap-2 text-nowrap">
                            <BookOpenIcon size={14} />
                            50+ expert lessons
                        </span>
                    </div>
                    <p className="md:text-lg leading-tight">
                        Transform your outdoor space with our expert-led courses. From beginner fundamentals to advanced techniques, unlock the skills to create stunning gardens that inspire.
                    </p>
                    <div className="flex gap-4 mt-4">
                        <Button asChild size="lg">
                            <Link href="#courses">
                                Explore courses
                                <ArrowRightIcon />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="secondary">
                            <Link href="/signin">
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