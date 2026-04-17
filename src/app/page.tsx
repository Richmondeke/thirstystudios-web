"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [entered, setEntered] = useState(false);

  if (entered) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center animate-fade-in">
        <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-50">
          <h2 className="text-xl font-bold tracking-widest text-accent-gold">THIRSTYSTUDIOS</h2>
          <div className="flex gap-8 text-sm uppercase tracking-widest opacity-70">
            <a href="#" className="hover:text-accent transition-colors">Studios</a>
            <a href="#" className="hover:text-accent transition-colors">Engineers</a>
            <a href="#" className="hover:text-accent transition-colors">Testimonials</a>
            <a href="#" className="hover:text-accent transition-colors">Contact</a>
          </div>
        </nav>

        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background z-10" />
            <div className="w-full h-full bg-studio-gray flex items-center justify-center text-4xl opacity-20">
              [CINEMATIC STUDIO HERO IMAGE]
            </div>
          </div>

          <div className="relative z-20 text-center animate-slide-up">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-gradient">
              THE ART OF SOUND
            </h1>
            <p className="text-lg md:text-xl uppercase tracking-[0.5em] opacity-60">
              TORONTO'S PREMIER CREATIVE HUB
            </p>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <div className="w-px h-12 bg-foreground" />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="text-center animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold tracking-[0.2em] mb-12 text-foreground/90">
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
