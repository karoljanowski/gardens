'use server';
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { getSession } from "./auth";

export const addToCart = async (courseId: string) => {
    const cookieStore = await cookies();
    let cartId = cookieStore.get("cartId")?.value;
    const session = await getSession();

    if (!cartId) {
        const cart = await prisma.cart.create({
            data: {
                items: {
                    connect: { id: courseId }
                },
                userId: session?.user?.id
            },
            include: {
                items: true
            }
        });

        cookieStore.set("cartId", cart.id, {
            httpOnly: true,
        });
        return cart;
    }

    const cart = await prisma.cart.update({
        where: { id: cartId },
        data: {
            items: {
                connect: { id: courseId }
            },
            userId: session?.user?.id
        },
        include: {
            items: true
        }
    });

    return cart;
}

export const removeFromCart = async (courseId: string) => {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
        return null;
    }

    const cart = await prisma.cart.update({
        where: { id: cartId },
        data: {
            items: {
                disconnect: { id: courseId }
            }
        },
        include: {
            items: true
        }
    });

    return cart;
}
