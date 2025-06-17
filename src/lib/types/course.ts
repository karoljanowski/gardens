import { Prisma } from "@prisma/client";

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