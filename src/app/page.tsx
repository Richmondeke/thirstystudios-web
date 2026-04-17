"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  const [entered, setEntered] = useState(false);

  if (entered) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center animate-fade-in">
        <Header />

        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background z-10" />
            <Image
              src="/images/studio-a.png"
              alt="Studio A"
              fill
              className="object-cover opacity-60 scale-110 blur-sm"
            />
          </div>

          <div className="relative z-20 text-center animate-slide-up">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 text-gradient">
              THE ART OF SOUND
            </h1>
            <p className="text-sm md:text-lg uppercase tracking-[1em] opacity-40 mb-12">
              TORONTO — CANADA
            </p>
            <Link
              href="/studios"
              className="px-8 py-3 bg-white text-black text-xs tracking-[0.4em] uppercase hover:bg-accent-gold hover:text-white transition-all"
            >
              Explore Studios
            </Link>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <div className="w-px h-12 bg-foreground" />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="text-center animate-fade-in">
        <h1 className="text-4xl md:text-7xl font-bold tracking-[0.3em] mb-12 text-foreground/90">
          THIRSTYSTUDIOS
        </h1>
        <button
          onClick={() => setEntered(true)}
          className="group relative px-12 py-4 text-sm tracking-[0.4em] uppercase overflow-hidden border border-foreground/20 transition-all hover:border-accent-gold"
        >
          <span className="relative z-10 group-hover:text-accent-gold transition-colors">ENTER</span>
          <div className="absolute inset-0 bg-accent-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left opacity-10" />
        </button>
      </div>
    </main>
  );
}
