"use client"
import { FC } from 'react';
import { Laptop, User, HelpCircle, Lock} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  icon: JSX.Element;
  links: FooterLink[];
}

const Footer: FC = () => {
  const sections: FooterSection[] = [
    {
      title: 'Product',
      icon: <Laptop className="w-5 h-5" />,
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Security', href: '#' },
      ],
    },
    {
      title: 'Company',
      icon: <User className="w-5 h-5" />,
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
      ],
    },
    {
      title: 'Resources',
      icon: <HelpCircle className="w-5 h-5" />,
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Help Center', href: '#' },
        { label: 'Guides', href: '#' },
      ],
    },
    {
      title: 'Legal',
      icon: <Lock className="w-5 h-5" />,
      links: [
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
        { label: 'Security', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FiFacebook className="w-5 h-5" />, href: '#' },
    { icon: <FiTwitter className="w-5 h-5" />, href: '#' },
    { icon: <FiLinkedin className="w-5 h-5" />, href: '#' },
    { icon: <FiInstagram className="w-5 h-5" />, href: '#' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-900 to-violet-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-4 pt-16 pb-8">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {sections.map((section, index) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2 group">
                <span className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                  {section.icon}
                </span>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-blue-100/70 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="h-[2px] w-0 bg-blue-400 group-hover:w-4 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Social links and copyright */}
        <motion.div 
          className="mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-blue-100/70 hover:text-white transition-all hover:scale-110"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
            <p className="text-blue-100/70 text-sm">
              © {new Date().getFullYear()} Easmark, an AI-enabled product powered by HitoAI Limited. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
    </footer>
  );
};

export default Footer;