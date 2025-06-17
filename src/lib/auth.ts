import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true
    },
    plugins: [nextCookies()],
    user: {
        additionalFields: {
            isAdmin: {
                type: "boolean",
                defaultValue: false,
            },
            address: {
                type: "string",
            },
            city: {
                type: "string",
            },
            postalCode: {
                type: "string",
            },
            country: {
                type: "string",
            },
        }
    }
});

