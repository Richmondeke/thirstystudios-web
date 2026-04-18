
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { getStudioById } from "@/lib/studio-data";
import { notFound } from "next/navigation";

export default async function StudioDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const studio = getStudioById(id);

    if (!studio) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />

            <section className="relative h-[70vh] w-full pt-16">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background z-10" />
                    <Image
                        src={studio.image}
                        alt={studio.name}
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto h-full flex flex-col justify-end pb-20 px-8">
                    <div className="animate-slide-up">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-accent-yellow uppercase">
                            {studio.name}
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl opacity-80 leading-relaxed font-light mb-8">
                            {studio.description}
                        </p>
                        <div className="flex gap-6">
                            <Link
                                href={`/booking?studio=${studio.id}`}
                                className="px-10 py-4 bg-accent-yellow text-white text-xs tracking-[0.4em] font-bold uppercase hover:bg-white hover:text-black transition-all"
                            >
                                Book This Session
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto py-24 px-8 grid grid-cols-1 md:grid-cols-3 gap-20">
                <div className="md:col-span-2 space-y-16">
                    <div className="animate-fade-in">
                        <h2 className="text-sm uppercase tracking-[0.5em] text-accent-yellow mb-8">The Experience</h2>
                        <p className="text-2xl opacity-60 leading-relaxed font-light">
                            {studio.longDescription}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {studio.detailedGear.map((cat, i) => (
                            <div key={cat.category} className={`animate-slide-up delay-${i * 100}`}>
                                <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-6 border-b border-white/10 pb-2">
                                    {cat.category}
                                </h3>
                                <ul className="space-y-3">
                                    {cat.items.map(item => (
                                        <li key={item} className="text-sm opacity-50 flex items-center gap-3">
                                            <span className="w-1.5 h-1.5 bg-accent-yellow rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-12 animate-fade-in">
                    <div className="glass-panel p-8 rounded border border-white/5">
                        <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-8">Specifications</h3>
                        <ul className="space-y-6">
                            {studio.specs.map(spec => (
                                <li key={spec} className="flex flex-col gap-1">
                                    <span className="text-[10px] uppercase tracking-widest opacity-30">Status</span>
                                    <span className="text-sm font-medium">{spec}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-8 border border-accent-yellow/20 bg-accent-yellow/5 rounded">
                        <p className="text-xs uppercase tracking-[0.3em] font-bold mb-4">Questions?</p>
                        <p className="text-sm opacity-60 leading-relaxed mb-6">Need a custom quote or have specific technical requirements?</p>
                        <Link href="/contact" className="text-xs uppercase tracking-widest text-accent-yellow hover:text-white transition-colors">
                            Speak with an Engineer →
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="py-24 border-t border-white/5 text-center">
                <Image src="/images/studio-a.png" width={80} height={40} alt="Logo" className="mx-auto opacity-20 grayscale mb-8" />
                <p className="text-xs uppercase tracking-[0.5em] opacity-30">© 2024 THIRSTYSTUDIOS LAGOS</p>
            </footer>
        </main>
    );
}
