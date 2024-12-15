"use client"

import React from 'react';
import { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Dashboard/Navbar';
import Image from 'next/image';

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Add your signup logic here
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-24">
                <div className="w-full max-w-md">
                    <div className="bg-white shadow-xl rounded-2xl p-8 relative overflow-hidden">
                        {/* Subtle branded accent */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
                        
                        <div className="flex flex-col items-center mb-8">
                            <Link href="/" className="absolute left-6 top-6 text-gray-600 hover:text-gray-900">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                            <p className="text-gray-600 mt-2 text-center">
                                Join Easmark to start your journey
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="pl-10"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="pl-10"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        type="password"
                                        placeholder="Create a password"
                                        className="pl-10"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        type="password"
                                        placeholder="Confirm your password"
                                        className="pl-10"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 hover:from-blue-600 hover:via-indigo-600 hover:to-violet-600 text-white font-medium"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>

                            <div className="text-center text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                                    Sign in
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}