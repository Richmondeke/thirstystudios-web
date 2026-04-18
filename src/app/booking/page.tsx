"use client";

import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import { Suspense } from "react";

function BookingContent() {
    const searchParams = useSearchParams();
    const studioId = searchParams.get("studio") || "music-studio";
    const studioName = studioId === "photo-studio" ? "Photo Studio" : "Music Studio";

    return (
        <main className="min-h-screen bg-background text-foreground pt-32 px-8">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-16 animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-accent-yellow uppercase">RESERVE YOUR TIME</h1>
                    <p className="text-xs uppercase tracking-[0.5em] opacity-40">Secure your session at premium rates</p>
                </header>

                <BookingForm studioId={studioId} studioName={studioName} />
            </div>

            <footer className="mt-32 py-16 border-t border-white/5 text-center">
                <p className="text-xs uppercase tracking-[0.5em] opacity-30">© 2026 THIRSTYSTUDIOS LAGOS</p>
            </footer>
        </main>
    );
}

export default function BookingPage() {
    return (
        <>
            <Header />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
                <BookingContent />
            </Suspense>
        </>
    );
}
