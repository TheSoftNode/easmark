import { FC } from 'react'
import { Laptop, User, HelpCircle, Lock } from 'lucide-react'
import Link from 'next/link'

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  icon: JSX.Element
  links: FooterLink[]
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
  ]

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                {section.icon}
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>© {new Date().getFullYear()} Easmark. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer