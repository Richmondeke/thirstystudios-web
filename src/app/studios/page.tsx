"use client";

import Image from "next/image";
import Link from "next/link";
import { studios } from "@/lib/studio-data";

export default function StudiosPage() {
    return (
        <main className="min-h-screen bg-background text-foreground pt-32 px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-20 animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-accent-yellow uppercase">OUR STUDIOS</h1>
                    <p className="text-xl opacity-60 max-w-2xl tracking-wide uppercase">
                        Elite recorded audio, born from the perfect harmony of space, gear, and inspiration.
                    </p>
                </header>

                <div className="grid gap-24">
                    {studios.map((studio, index) => (
                        <section
                            key={studio.id}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center animate-slide-up`}
                        >
                            <div className="flex-1 w-full aspect-[16/10] relative rounded-lg overflow-hidden glass-panel group">
                                <Image
                                    src={studio.image}
                                    alt={studio.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-6">
                                <h2 className="text-4xl font-bold tracking-tight">{studio.name}</h2>
                                <p className="text-lg opacity-80 leading-relaxed font-light">
                                    {studio.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {studio.gear.map((item) => (
                                        <span key={item} className="text-xs uppercase tracking-widest px-3 py-1 bg-studio-gray/50 rounded-full border border-white/5">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-4 mt-4">
                                    <Link
                                        href={`/booking?studio=${studio.id}`}
                                        className="px-6 py-2 bg-white text-black text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-accent-yellow transition-colors"
                                    >
                                        Book Now
                                    </Link>
                                    <Link
                                        href={`/studios/${studio.id}`}
                                        className="px-6 py-2 border border-white/10 text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-white/5 transition-colors"
                                    >
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            <footer className="mt-32 py-16 border-t border-white/5 text-center">
                <p className="text-xs uppercase tracking-[0.5em] opacity-30">© 2024 THIRSTYSTUDIOS LAGOS</p>
            </footer>
        </main>
    );
}
