import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET() {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
        return NextResponse.json({ items: [] });
    }

    const cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: {
            items: true
        }
    });

    return NextResponse.json(cart);
}