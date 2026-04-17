"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference">
            <Link href="/" className="text-xl font-bold tracking-[0.3em] text-white hover:text-accent-gold transition-colors">
                THIRSTYSTUDIOS
            </Link>
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.4em] text-white/70">
                <Link
                    href="/studios"
                    className={`hover:text-accent-gold transition-colors ${pathname === '/studios' ? 'text-accent-gold' : ''}`}
                >
                    Studios
                </Link>
                <Link href="#" className="hover:text-accent-gold transition-colors">Engineers</Link>
                <Link href="#" className="hover:text-accent-gold transition-colors">Gear</Link>
                <Link href="#" className="hover:text-accent-gold transition-colors">Contact</Link>
            </div>
        </nav>
    );
}
