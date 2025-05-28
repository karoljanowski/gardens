"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const signUp = async () => {
    await auth.api.signUpEmail({
        body: {
            email: "orcdev@test.com",
            password: "password123",
            name: "Orc Dev"
        }
    })
}

export const signIn = async () => {
    await auth.api.signInEmail({
        body: { email: "orcdev@test.com", password: "password123" },
    });
}

export const signOut = async () => {
    await auth.api.signOut({ headers: await headers() });
}

export const getSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session;
}


