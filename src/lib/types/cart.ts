import { Prisma } from "@prisma/client";

export type TCartCourse = Prisma.CourseGetPayload<{
  include: {
    modules: true
  }
}>;