"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Biohazard } from "lucide-react";

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const navLinks = [
        { name: "Studios", href: "/#studios", id: "studios" },
        { name: "Contact", href: "/#contact", id: "contact" },
    ];

    const handleClick = (e: React.MouseEvent, id: string) => {
        if (pathname === '/') {
            e.preventDefault();
            document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            <nav className={`fixed top-0 w-full z-[60] transition-all duration-500 flex ${scrolled ? 'justify-center p-4' : 'justify-between p-6 md:p-8 px-8 md:px-16'}`}>
                <div className={`
                    flex justify-between items-center transition-all duration-500
                    ${scrolled
                        ? 'w-full bg-black/80 backdrop-blur-md rounded-full py-3 px-8 md:px-12 border border-white/10 max-w-5xl shadow-2xl'
                        : 'w-full mix-blend-difference'
                    }
                `}>
                    <Link
                        href="/"
                        className="text-lg md:text-xl font-bold tracking-[0.3em] text-white hover:text-accent-yellow transition-colors flex items-center gap-2 group"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <Biohazard className={`transition-all duration-500 ${scrolled ? 'w-5 h-5 text-accent-yellow' : 'w-6 h-6 text-white group-hover:text-accent-yellow'}`} />
                        <span className={scrolled ? 'text-xs md:text-xl' : ''}>THIRSTYSTUDIOS</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className={`hidden md:flex items-center gap-8 ${scrolled ? 'text-[9px]' : 'text-[10px]'} uppercase tracking-[0.4em] text-white/70`}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="hover:text-accent-yellow transition-colors"
                                onClick={(e) => handleClick(e, link.id)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/login"
                            className={`
                                transition-all duration-300 whitespace-nowrap font-bold
                                ${scrolled
                                    ? 'bg-accent-yellow text-black px-4 py-1.5 text-[8px] rounded-full hover:bg-white'
                                    : 'px-6 py-2 bg-white text-black border border-white hover:bg-accent-yellow hover:border-accent-yellow hover:text-white'
                                }
                            `}
                        >
                            Members Only
                        </Link>
                    </div>

                    {/* Mobile Hamburger Toggle */}
                    <button
                        className="md:hidden z-[70] mix-blend-difference outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <motion.div
                            animate={{
                                rotate: isMenuOpen ? 180 : 0,
                                scale: isMenuOpen ? 1.2 : 1,
                                color: isMenuOpen ? "#F4CE14" : "#FFFFFF"
                            }}
                            transition={{ type: "spring", damping: 15 }}
                        >
                            <Biohazard size={scrolled ? 24 : 32} />
                        </motion.div>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-black z-[55] flex flex-col items-center justify-center gap-12"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-2xl font-bold uppercase tracking-[0.3em] text-white hover:text-accent-yellow"
                                    onClick={(e) => handleClick(e, link.id)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/login"
                                className="mt-8 px-10 py-4 bg-accent-yellow text-black font-black text-sm tracking-[0.4em] uppercase"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Members Only
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
