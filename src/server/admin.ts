'use server'

import { getSession } from "./auth";

export const isAdmin = async () => {
    const session = await getSession();
    return session?.user?.isAdmin;
}