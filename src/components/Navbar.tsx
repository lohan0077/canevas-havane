"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const navLinks = [
    { href: "/expertise", label: "Expertise" },
    { href: "/tarifs", label: "Tarifs" },
    { href: "/realisations", label: "Projets" },
    { href: "/blog", label: "Journal" },
    { href: "/a-propos", label: "L'Atelier" },
  ];

  return (
    <>
      <div className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 w-full max-w-6xl z-50 px-4 md:px-12">
        <nav className="h-14 md:h-16 glass-card !rounded-2xl border-white/10 bg-white/5 flex items-center justify-between px-4 md:px-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] backdrop-blur-2xl transition-all duration-500">
          {/* Left: Logo/Brand */}
          <div className="flex items-center gap-1 shrink-0">
            <Link href="/" className="relative h-8 md:h-12 w-32 md:w-48">
              <Image 
                src="/logo.webp" 
                alt="Canevas Havane" 
                fill 
                className="object-contain" 
                priority
              />
            </Link>
          </div>

          {/* Center: Navigation (Hidden on mobile/tablet) */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  pathname === link.href ? "text-[var(--color-primary)]" : "text-[#2C2420]/50 hover:text-[var(--color-primary)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Right: CTA & Hamburger */}
          <div className="flex items-center gap-4">
            <Link href="/contact" onClick={() => setIsOpen(false)} className="btn-premium !px-4 md:!px-7 !py-2 md:!py-2.5 !text-[8px] md:!text-[9px] !tracking-[0.15em] md:!tracking-[0.2em] shadow-lg">
              Devis Gratuit
            </Link>

            {/* Hamburger Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
              aria-label="Menu"
            >
              <span className={`w-5 h-[1.5px] bg-[#2C2420] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`w-5 h-[1.5px] bg-[#2C2420] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-[1.5px] bg-[#2C2420] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[45] lg:hidden transition-all duration-700 ease-in-out ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <div className="absolute inset-0 bg-[var(--color-background)]/90 backdrop-blur-xl" />
        
        <div className="relative h-full flex flex-col items-center justify-center p-8">
          <div className="space-y-12 text-center">
            {navLinks.map((link, index) => (
              <div 
                key={link.href}
                className={`transition-all duration-500 delay-[${index * 100}ms] transform ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-4xl md:text-6xl font-medium uppercase tracking-tight font-serif ${
                    pathname === link.href ? "text-gradient italic" : "text-[var(--color-foreground)] opacity-40 hover:opacity-100"
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          <div className={`mt-24 transition-all duration-700 delay-500 transform ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
             <Link href="/contact" onClick={() => setIsOpen(false)} className="btn-premium !px-12 !py-5 !text-xs">
                Commencer mon projet
             </Link>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-10">
             <span className="text-[15vw] font-black uppercase tracking-tighter italic whitespace-nowrap select-none">HAVANE</span>
          </div>
        </div>
      </div>
    </>
  );
}
