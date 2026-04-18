"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserBookingsAction } from "@/app/actions/dashboard";
import { useRouter } from "next/navigation";


export default function DashboardPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                fetchBookings(currentUser.email!);
            } else {
                router.push("/login");
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchBookings = async (email: string) => {
        const result = await getUserBookingsAction(email);
        if (result.success && result.bookings) {
            setBookings(result.bookings);
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-background text-foreground pt-32 px-8">
            <Header />
            <div className="max-w-7xl mx-auto">
                <header className="mb-20 animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-accent-yellow uppercase">YOUR HUB</h1>
                    <p className="text-xl opacity-60 max-w-2xl tracking-wide uppercase">
                        Manage results, track bookings, and access your studio codes.
                    </p>
                </header>

                <div className="grid gap-12">
                    <section className="glass-panel p-8 md:p-12 animate-slide-up">
                        <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest">Upcoming Sessions</h2>
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-8 h-8 border-2 border-accent-yellow border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : bookings.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-white/5">
                                        <tr>
                                            <th className="py-4 text-[10px] uppercase tracking-widest opacity-40">Studio</th>
                                            <th className="py-4 text-[10px] uppercase tracking-widest opacity-40">Date</th>
                                            <th className="py-4 text-[10px] uppercase tracking-widest opacity-40">Status</th>
                                            <th className="py-4 text-[10px] uppercase tracking-widest opacity-40">Access Code</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {bookings.map(booking => (
                                            <tr key={booking.id} className="group hover:bg-white/5 transition-colors">
                                                <td className="py-6 text-sm font-bold uppercase tracking-widest">{booking.studio}</td>
                                                <td className="py-6 text-sm opacity-60">{booking.date} @ {booking.time} ({booking.duration})</td>
                                                <td className="py-6">
                                                    <span className={`px-3 py-1 ${booking.status === 'confirmed' || booking.status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'} text-[10px] uppercase font-bold rounded-full`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="py-6">
                                                    <span className="text-xl font-mono text-accent-yellow font-black tracking-[0.2em]">
                                                        {booking.accessCode}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-20 opacity-40 uppercase tracking-widest text-xs">
                                No sessions found yet. Get started and book a studio.
                            </div>
                        )}
                    </section>

                    <section className="grid md:grid-cols-2 gap-8">
                        <div className="glass-panel p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            <h3 className="text-lg font-bold mb-4 uppercase">$UPERSTAR PERKS</h3>
                            <ul className="space-y-4 opacity-60 text-xs uppercase tracking-widest">
                                <li>• Priority Booking Access</li>
                                <li>• Complimentary Beverage Service</li>
                                <li>• Secure Cloud Storage for Masters</li>
                            </ul>
                        </div>
                        <div className="glass-panel p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            <h3 className="text-lg font-bold mb-4 uppercase">SUPPORT</h3>
                            <p className="text-xs opacity-60 leading-relaxed tracking-widest">
                                NEED ASSISTANCE WITH YOUR SESSION? CONTACT OUR ON-CALL ENGINEER VIA THE PORTAL OR APP.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
