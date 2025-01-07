import Navbar from '@/components/Dashboard/Navbar';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ReduxProvider } from '../../src/redux/provider';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
})
{
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <ReduxProvider>
                {/* <Navbar /> */}

                {children}
                <Toaster position="top-center" />
            </ReduxProvider>
        </div>
    );
}