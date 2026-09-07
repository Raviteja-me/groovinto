'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navLinks } from '../lib/data';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all ${
        scrolled ? 'backdrop-blur bg-black/50 border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center" aria-label="Groovinto home">
          <div className="relative h-32 w-80 drop-shadow-[0_0_30px_rgba(255,106,0,0.65)] flex-shrink-0">
            <Image
              src="/logo/groovinto.png"
              alt="Groovinto logo"
              fill
              sizes="360px"
              className="object-contain"
              priority
            />
          </div>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-neutral lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition hover:text-light ${
                pathname === link.href ? 'text-light' : 'text-neutral'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:translate-y-[-1px]"
          >
            Start Project
          </Link>
        </div>
      </nav>
    </header>
  );
}
