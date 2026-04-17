"use client";

import Image from "next/image";
import Link from "next/link";

const studios = [
    {
        id: "studio-a",
        name: "Studio A",
        description: "Our flagship control room featuring the legendary Neve 8068 console and an expansive collection of vintage outboard gear. Designed for elite sonic precision.",
        image: "/images/studio-a.png",
        gear: ["Neve 8068 Console", "Urei 1176LN", "Teletronix LA-2A", "Studer A827", "Pro Tools HDX"]
    },
    {
        id: "studio-b",
        name: "Studio B",
        description: "A versatile live-room focused environment centered around a stunning Steinway Grand and a custom 48-channel SSL console. The soul of Thirstystudios.",
        image: "/images/studio-b.png",
        gear: ["SSL 4000 G+ Console", "Steinway Model D", "Yamaha Recording Custom Drums", "Manley Massive Passive"]
    },
    {
        id: "studio-c",
        name: "Studio C",
        description: "An intimate production and mixing suite optimized for modern workflows. Equipped with cutting-edge analog-digital hybrid systems and vintage synthesizers.",
        image: "/images/studio-c.png",
        gear: ["API 1608 Console", "Moog One", "Prophet-5", "Barefoot Footprint01 Monitors"]
    }
];

export default function StudiosPage() {
    return (
        <main className="min-h-screen bg-background text-foreground pt-32 px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-20 animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-gradient">OUR STUDIOS</h1>
                    <p className="text-xl opacity-60 max-w-2xl tracking-wide uppercase italic">
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
                                <Link
                                    href={`/studios/${studio.id}`}
                                    className="mt-4 text-accent-gold uppercase tracking-[0.3em] text-sm hover:text-white transition-colors flex items-center gap-2 group"
                                >
                                    Explore Details
                                    <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform">→</span>
                                </Link>
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            <footer className="mt-32 py-16 border-t border-white/5 text-center">
                <p className="text-xs uppercase tracking-[0.5em] opacity-30">© 2024 THIRSTYSTUDIOS TORONTO</p>
            </footer>
        </main>
    );
}
