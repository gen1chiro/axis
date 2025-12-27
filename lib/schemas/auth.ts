import { z } from 'zod';

export const SignInSchema = z.object({
    email: z.string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z.string().
        min(6, 'Password must be at least 6 characters long')
})

export const SingUpSchema = SignInSchema.extend({
    confirmPassword: z.string()
        .min(1, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})

export type SignInData = z.infer<typeof SignInSchema>;
export type SignUpData = z.infer<typeof SingUpSchema>;