"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { setupUserAccountAction } from "@/app/actions/auth";
import { getBookingAction } from "@/app/actions/booking";


function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const reference = searchParams.get("reference");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        if (reference) {
            getBookingAction(reference).then(result => {
                if (result.success && result.data) {
                    setEmail(result.data.email);
                    setName(result.data.name);
                }
            });
        }
    }, [reference]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {

            const result = await setupUserAccountAction(email, password, name);
            if (result.success) {
                setMessage("Account created! Redirecting to dashboard...");
                setTimeout(() => {
                    router.push("/dashboard");
                }, 2000);
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground pt-32 px-8">
            <div className="max-w-xl mx-auto text-center">
                <div className="w-20 h-20 bg-accent-yellow/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <span className="text-4xl text-accent-yellow">✓</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-accent-yellow uppercase">
                    Booking Confirmed
                </h1>
                <p className="text-xs uppercase tracking-[0.4em] opacity-40 mb-12">
                    Reference: {reference}
                </p>

                <div className="glass-panel p-8 md:p-12 text-left animate-slide-up">
                    <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Secure your access</h2>
                    <p className="text-sm opacity-60 mb-8 leading-relaxed">
                        Create a password to complete your account. This allows you to view your
                        <span className="text-accent-yellow font-bold"> STUDIO ACCESS CODE</span>, manage your bookings,
                        and unlocks exclusive <span className="text-accent-yellow font-bold">$UPERSTAR PERKS</span>.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-2">Create Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 p-4 focus:border-accent-yellow outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-white text-black text-xs tracking-[0.3em] uppercase font-bold hover:bg-accent-yellow hover:text-white transition-all disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Set Password & Experience the Hub'}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Already have a Superstar account?</p>
                        <button
                            onClick={() => router.push("/login")}
                            className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent-yellow hover:text-white transition-colors"
                        >
                            Log In to Your Hub
                        </button>
                    </div>

                    {message && (
                        <p className="mt-6 text-center text-xs uppercase tracking-widest text-accent-yellow animate-fade-in">
                            {message}
                        </p>
                    )}
                </div>

                <div className="mt-12 opacity-30">
                    <p className="text-[10px] uppercase tracking-[0.5em]">A confirmation email has been sent to your inbox.</p>
                </div>
            </div>
        </main>
    );
}

export default function SuccessPage() {
    return (
        <>
            <Header />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Finalizing your booking...</div>}>
                <SuccessContent />
            </Suspense>
        </>
    );
}
