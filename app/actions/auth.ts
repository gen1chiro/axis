'use server';

import {
    SignInSchema,
    SingUpSchema,
    SignInData,
    SignUpData
} from "@/lib/schemas/auth";
import { verifyPassword } from "@/lib/utils";
import { createSession, destroySession } from "@/lib/auth";
import { createUser, getUserByEmail } from "@/lib/dal";
import { redirect } from "next/navigation";

export type ActionResponse = {
    success: boolean
    message: string
    errors?: Record<string, string[]>
    error?: string
}

export const signIn = async (formData: FormData): Promise<ActionResponse> => {
    try {
        const data: SignInData= {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }

        const validationResult = SignInSchema.safeParse(data);

        if (!validationResult.success) {
            return {
                success: false,
                message: 'Validation errors occurred',
                errors: validationResult.error.flatten().fieldErrors,
            }
        }

        const user = await getUserByEmail(data.email);

        if (!user) {
            return {
                success: false,
                message: 'Invalid email or password',
                errors: {
                    email: ['Invalid email or password'],
                }
            }
        }

        const isPasswordValid = await verifyPassword(data.password, user.password);

        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Invalid email or password',
                errors: {
                    password: ['Invalid email or password'],
                }
            }
        }

        await createSession(user.id);

        return {
            success: true,
            message: 'Successfully logged in',
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'An unexpected error occurred',
            error: 'An unexpected error occurred',
        }
    }
}

export const signUp = async (formData: FormData): Promise<ActionResponse> => {
    try {
        const data: SignUpData = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirmPassword') as string,
        }

        const validationResult = SingUpSchema.safeParse(data);

        if (!validationResult.success) {
            return {
                success: false,
                message: 'Validation errors occurred',
                errors: validationResult.error.flatten().fieldErrors,
            }
        }

        const existingUser = await getUserByEmail(data.email);

        if (existingUser) {
            return {
                success: false,
                message: 'Email is already in use',
                errors: {
                    email: ['Email is already in use'],
                }
            }
        }

        const user = await createUser(data.email, data.password);

        if (!user) {
            return {
                success: false,
                message: 'Failed to create user',
                error: 'Failed to create user',
            }
        }

        await createSession(user.id as string);

        return {
            success: true,
            message: 'Successfully registered',
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'An unexpected error occurred',
            error: 'An unexpected error occurred',
        }
    }
}

export const signOut = async () => {
    try {
        await destroySession();
    } catch (error) {
        console.error('Error signing out:', error);
    } finally {
        redirect('/signin');
    }
}