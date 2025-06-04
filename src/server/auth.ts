"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string().min(8, { message: "Please confirm your password" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});


export const signUp = async (_: unknown, formData: FormData): Promise<{errors: Record<string, string[]>, success: boolean, data?: Record<string, string | undefined>}> => {
    const returnFormData = () => {
        return {
            email: formData.get("email")?.toString(),
            password: formData.get("password")?.toString(),
            confirmPassword: formData.get("confirmPassword")?.toString(),
            firstName: formData.get("firstName")?.toString(),
            lastName: formData.get("lastName")?.toString(),
            address: formData.get("address")?.toString(),
            city: formData.get("city")?.toString(),
            postalCode: formData.get("postalCode")?.toString(),
            country: formData.get("country")?.toString(),
        }
    }
    const validatedFields = signUpSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        address: formData.get("address"),
        city: formData.get("city"),
        postalCode: formData.get("postalCode"),
        country: formData.get("country"),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
            data: returnFormData(),
        }
    }

    if (validatedFields.data.password !== validatedFields.data.confirmPassword) {
        return {
            errors: {
                confirmPassword: ["Passwords do not match"],
            },
            success: false,
            data: returnFormData(),
        }
    }

    const { email, password, firstName, lastName, address, city, postalCode, country } = validatedFields.data;

    try {
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: `${firstName} ${lastName}`,
                address,
                city,
                postalCode,
                country,
            }
        })

        return {
            success: true,
            errors: {},
            data: returnFormData(),
        }

    } catch (error: unknown) {
        let defaultError = "Something went wrong with sign up";
        
        if (error instanceof Error) {
            defaultError = error.message;
        }
        console.log(defaultError);

        return {
            errors: {
                auth: [defaultError],
            },
            success: false,
            data: returnFormData(),
        }
    }
}

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Wrong password" }),
});

export const signIn = async (_: unknown, formData: FormData): Promise<{errors: Record<string, string[]>, success: boolean}> => {
    const validatedFields = signInSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        }
    }

    const { email, password } = validatedFields.data;

    try {
        const response = await auth.api.signInEmail({
            body: { email, password },
        });

        const userId = response.user.id;
        
        // connect cart to user
        if (userId) {
            const cookieStore = await cookies();
            const cartId = cookieStore.get("cartId")?.value;

            if (cartId) {
                await prisma.cart.update({
                    where: { id: cartId },
                    data: { userId },
                });
            }
        }

        return {
            success: true,
            errors: {},
        }
    } catch (error: unknown) {
        let defaultError = "Something went wrong with sign in";
        if (error instanceof Error) {
            defaultError = error.message;
        }
        return {
            errors: { auth: [defaultError] },
            success: false,
        }
    } 
}

export const signOut = async () => {
    await auth.api.signOut({ headers: await headers() });
    redirect("/");
}

export const getSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session;
}


