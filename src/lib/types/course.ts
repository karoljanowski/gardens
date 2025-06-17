import { Prisma } from "@/generated/prisma";

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
    course: {
      include: {
        modules: {
          include: {
            lessons: true;
          }
        }
      }
    };
  };
}>;

export type TCourseWithModulesAndLessons = Prisma.CourseGetPayload<{
  include: {
    modules: {
      include: {
        lessons: true;
      }
    }
  };
}>;

export type TModuleWithLessons = Prisma.ModuleGetPayload<{
  include: {
    lessons: true;
  };
}>;