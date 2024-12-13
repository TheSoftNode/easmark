"use client"

import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import Logo from '../Landing/Logo';
import Link from 'next/link';

const Navbar = () =>
{
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() =>
    {
        const handleScroll = () =>
        {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () =>
        {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav
            className={`
        fixed top-0 left-0 right-0 h-20 z-50 px-4 md:px-8 
        transition-all duration-300
        ${isScrolled
                    ? 'bg-white/90 backdrop-blur-md shadow-md'
                    : 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 backdrop-blur-sm'
                }
      `}
        >
            <div className="relative h-full flex items-center justify-between">
                {/* Logo area */}
                <Link href="/">
                    <div className="relative">
                        <Logo />
                    </div>
                </Link>

                {/* Right side elements */}
                <div className="flex items-center gap-4">
                    {/* User button with enhanced visibility */}
                    <button
                        className={`
              group relative flex items-center justify-center 
              w-10 h-10 rounded-full overflow-hidden 
              transition-all duration-300
              ${isScrolled
                                ? 'bg-violet-100/50 hover:bg-violet-200/70'
                                : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
                            }
            `}
                    >
                        <User
                            size={20}
                            className={`
                relative 
                ${isScrolled
                                    ? 'text-violet-800 hover:text-violet-900'
                                    : 'text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]'
                                } 
                group-hover:scale-105 transition-all
              `}
                        />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;