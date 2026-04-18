"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/dashboard");
        } catch (err: any) {
            console.error("Login error:", err);
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground pt-32 px-8">
            <Header />
            <div className="max-w-md mx-auto">
                <header className="mb-12 text-center animate-fade-in">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-accent-yellow uppercase">LOGIN</h1>
                    <p className="text-xs uppercase tracking-[0.4em] opacity-40">Access Your Studio Hub</p>
                </header>

                <div className="glass-panel p-8 md:p-12 animate-slide-up">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 p-4 focus:border-accent-yellow outline-none transition-colors"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-2">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 p-4 focus:border-accent-yellow outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-xs uppercase tracking-widest animate-shake">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-white text-black text-xs tracking-[0.3em] uppercase font-bold hover:bg-accent-yellow hover:text-white transition-all disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : 'Enter the Hub'}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">New Superstar?</p>
                        <Link
                            href="/booking"
                            className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent-yellow hover:text-white transition-colors"
                        >
                            Book a Session to Join
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
