"use client"

import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import Logo from './Logo';
import Link from 'next/link';

const EasmarkNavbar = () =>
{
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() =>
  {
    const handleScroll = () =>
    {
      // Change navbar background when scrolled more than 100px
      setIsScrolled(window.scrollY > 100);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener
    return () =>
    {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 h-20 z-50 px-4 md:px-8 
        transition-colors duration-300
        ${isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md'
          : 'bg-transparent'
        }
      `}
    >
      {/* Semi-transparent gradient overlay for better text contrast */}
      {!isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
      )}

      <div className="relative h-full flex items-center justify-between">
        {/* Logo area with enhanced contrast */}

        <Link href="/">
          <div className="relative">
            <Logo />
          </div>
        </Link>

        {/* Right side elements */}
        <div className="flex items-center gap-4">
          {/* User button with glass effect */}
          <button
            className={`
              group relative flex items-center justify-center 
              w-10 h-10 rounded-full overflow-hidden 
              transition-all duration-300
              ${isScrolled
                ? 'bg-gray-100/50 hover:bg-gray-200/70'
                : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
              }
            `}
          >
            {/* Button content */}
            <User
              size={20}
              className={`
                relative 
                ${isScrolled
                  ? 'text-gray-800 hover:text-black'
                  : 'text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]'
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

export default EasmarkNavbar;