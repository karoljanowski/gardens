'use server';
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export const addToCart = async (courseId: string) => {
    const cookieStore = await cookies();
    let cartId = cookieStore.get("cartId")?.value;

    // Create cart if it doesn't exist
    if (!cartId) {
        const cart = await prisma.cart.create({
            data: {
                items: {
                    connect: { id: courseId }
                }
            },
            include: {
                items: true
            }
        });
        cookieStore.set("cartId", cart.id);
        return cart;
    }

    // Add course to existing cart
    const cart = await prisma.cart.update({
        where: { id: cartId },
        data: {
            items: {
                connect: { id: courseId }
            }
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

export const clearCart = async () => {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
        return null;
    }

    const cart = await prisma.cart.update({
        where: { id: cartId },
        data: {
            items: {
                set: []
            }
        },
        include: {
            items: true
        }
    });

    return cart;
}

export const getCart = async () => {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
        return null;
    }

    const cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: {
            items: true
        }
    });

    return cart;
}