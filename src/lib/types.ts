import { Prisma } from "@/generated/prisma";

export type TMenuItem = {
    href: string;
    label: string;
}

export type TCourse = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    modules?: string[];
    price: number;
}

export type TUserCourse = Prisma.UserCourseGetPayload<{
    include: {
      course: true;
    };
  }>;