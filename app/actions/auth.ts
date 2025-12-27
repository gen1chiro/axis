'use server';

import {
    SignInSchema,
    SingUpSchema,
    SignInData,
    SignUpData
} from "@/lib/schemas/auth";
import { verifyPassword } from "@/lib/utils";
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

        //TODO
        // create user session

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

        //TODO
        // create user session

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
    //TODO
    // destroy user session
    redirect('/signin');
}