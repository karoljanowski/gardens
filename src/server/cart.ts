'use server';
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { getSession } from "./auth";
import { cache } from "react";
import { revalidatePath } from "next/cache";

export const getCart = cache(async (cartId: string) => {  
    const cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: {
            items: true
        }
    });

    if (!cart) {
        return null;
    }

    return cart;
});

export const addToCart = async (courseId: string) => {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;
    const session = await getSession();

    revalidatePath("/cart");
    if (!cartId) {
        const cart = await prisma.cart.create({
            data: {
                items: {
                    connect: { id: courseId }
                },
                userId: session?.user?.id
            },
            include: {
                items: {
                    include: {
                        modules: true
                    }
                }
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
            items: {
                include: {
                    modules: true
                }
            }
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

    revalidatePath("/cart");

    const cart = await prisma.cart.update({
        where: { id: cartId },
        data: {
            items: {
                disconnect: { id: courseId }
            }
        },
        include: {
            items: {
                include: {
                    modules: true
                }
            }
        }
    });

    return cart;
}
