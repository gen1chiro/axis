"use client"

import React, { useState, useActionState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Link from "next/link";
import axisLogo from '@/public/images/axis-logo.png';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { ActionResponse, signUp } from '@/app/actions/auth';
import Spinner from "@/components/spinner";

const initialState: ActionResponse = {
    success: false,
    message: '',
    errors: undefined,
}

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const [state, formAction, isPending] = useActionState<ActionResponse, FormData>
    (
        async (_, formData: FormData) => {
            try {
                const result = await signUp(formData)

                if (result.success) {
                    router.push('/dashboard')
                }

                return result
            } catch (err) {
                return {
                    success: false,
                    message: (err as Error).message || 'An error occurred',
                    errors: undefined,
                }
            }
    }, initialState)

    return (
        <main className="min-h-dvh bg-background flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md z-10">
                {/* Form */}
                <div className="bg-stone-200 rounded-lg p-4 border border-stone-300">
                    <div className="flex flex-col items-start justify-center gap-4 mb-8">
                        <div className="flex items-center justify-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-purple-400" />
                            <span className="text-sm text-body">
                                GET STARTED
                            </span>
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <Link href={"/"}>
                                <Image src={axisLogo} alt={'axis logo'} className='w-8 aspect-square sm:w-10' />
                            </Link>
                            <h1 className="text-2xl sm:text-3xl text-heading">
                                Create Account
                            </h1>
                        </div>
                        {
                            !state.success && state.message && (
                                <div className='w-full bg-red-100 border border-red-400 text-red-700 text-body p-2 rounded-xs text-xs'>
                                    {state.message}
                                </div>
                            )
                        }
                    </div>

                    <form
                        action={formAction}
                        className="space-y-6"
                    >
                        <div>
                            <label htmlFor="signup-email" className="block text-xs text-body mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="signup-email"
                                    name='email'
                                    className={`block w-full text-heading text-sm pl-10 pr-3 py-3 border rounded-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-stone-100 ${state.errors?.email ? 'border-red-200' : 'border-stone-300'} `}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {
                                state.errors?.email && (
                                    <p className="mt-1 text-xs text-body text-red-600">
                                        {state.errors.email[0]}
                                    </p>
                                )
                            }
                        </div>

                        <div>
                            <label htmlFor="signup-password" className="block text-xs text-body mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="signup-password"
                                    name='password'
                                    className={`block w-full text-heading text-sm pl-10 pr-3 py-3 border rounded-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-stone-100 ${state.errors?.password ? 'border-red-200' : 'border-stone-300'} `}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <FiEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            {
                                state.errors?.password && (
                                    <p className="mt-1 text-xs text-body text-red-600">
                                        {state.errors.password[0]}
                                    </p>
                                )
                            }
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block text-xs text-body mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirm-password"
                                    name='confirmPassword'
                                    className={`block w-full text-heading text-sm pl-10 pr-3 py-3 border rounded-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-stone-100 ${state.errors?.confirmPassword ? 'border-red-200' : 'border-stone-300'} `}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showConfirmPassword ? (
                                        <FiEyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <FiEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            {
                                state.errors?.confirmPassword && (
                                    <p className="mt-1 text-xs text-body text-red-600">
                                        {state.errors.confirmPassword[0]}
                                    </p>
                                )
                            }
                        </div>

                        <button
                            type='submit'
                            disabled={ isPending }
                            className={`w-full text-heading text-white py-2 text-sm rounded-sm transition-colors flex items-center gap-2 justify-center ${isPending ? 'bg-zinc-600 cursor-not-allowed' : 'bg-zinc-900 hover:bg-zinc-800'}`}
                        >
                            { isPending && <Spinner /> }
                            { isPending ? 'Creating Account' : 'Create Account' }
                        </button>
                    </form>

                    <div className="mt-6 mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-dotted border-stone-400" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-stone-200 text-body text-gray-500">or</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-xs text-zinc-600 text-body">
                        Already have an account?{' '}
                        <Link href={'/signin'} className="text-zinc-900 font-medium decoration-dotted hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
            <div
                className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(120, 113, 108, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '12px 12px',
                    maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)'
                }}
            />
        </main>
    );
};

export default SignUpPage;