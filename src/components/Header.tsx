"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 w-full p-4 md:p-8 px-6 md:px-16 flex justify-between items-center z-50 mix-blend-difference">
            <Link href="/" className="text-lg md:text-xl font-bold tracking-[0.3em] text-white hover:text-accent-yellow transition-colors">
                THIRSTYSTUDIOS
            </Link>
            <div className="flex items-center gap-4 md:gap-8 text-[10px] uppercase tracking-[0.4em] text-white/70">
                <Link
                    href="/#studios"
                    className={`hover:text-accent-yellow transition-colors ${pathname === '/studios' ? 'text-accent-yellow' : ''}`}
                    onClick={(e) => {
                        if (pathname === '/') {
                            e.preventDefault();
                            document.querySelector('#studios')?.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                >
                    Studios
                </Link>
                <Link
                    href="/#contact"
                    className="hover:text-accent-yellow transition-colors hidden md:block"
                    onClick={(e) => {
                        if (pathname === '/') {
                            e.preventDefault();
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                >
                    Contact
                </Link>
                <Link
                    href="/login"
                    className="px-4 md:px-6 py-2 bg-white text-black font-bold border border-white hover:bg-accent-yellow hover:border-accent-yellow hover:text-white transition-all duration-300 whitespace-nowrap"
                >
                    Members Only
                </Link>
            </div>
        </nav>
    );
}
