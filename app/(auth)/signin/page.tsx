"use client"

import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Link from "next/link";
import axisLogo from '@/public/images/axis-logo.png';
import Image from "next/image";

const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
                {/* Form */}
                <div className="bg-stone-200 rounded-lg p-4 border border-stone-300">
                    <div className="flex flex-col items-start justify-center gap-4 mb-8">
                        <div className="flex items-center justify-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-purple-400" />
                            <span className="text-sm text-body">
                                WELCOME BACK
                            </span>
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <Link href={"/"}>
                                <Image src={axisLogo} alt={'axis logo'} className='w-8 aspect-square sm:w-10' />
                            </Link>
                            <h1 className="text-2xl sm:text-3xl text-heading">
                                Sign In
                            </h1>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-xs text-body mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full text-heading text-sm pl-10 pr-3 py-3 border border-stone-300 rounded-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-stone-100"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs text-body mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full text-heading text-sm pl-10 pr-10 py-3 border border-stone-300 rounded-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-stone-100"
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
                        </div>

                        <button
                            className="w-full bg-zinc-900 text-heading text-white py-2 text-sm rounded-sm hover:bg-zinc-800 transition-colors"
                        >
                            Sign In
                        </button>
                    </div>

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
                        Don't have an account?{' '}
                        <Link href={'/signup'} className="text-zinc-900 font-medium decoration-dotted hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;