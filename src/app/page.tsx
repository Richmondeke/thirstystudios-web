"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";
import { studios } from "@/lib/studio-data";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Biohazard } from "lucide-react";
import { submitEnquiry } from "./actions/enquiries";

function Typewriter({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.div className="overflow-hidden flex flex-wrap justify-center">
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap mr-[0.2em] last:mr-0">
          {word.split("").map((char, j) => (
            <motion.span
              key={j}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5 + (i * 0.1) + (j * 0.05),
                duration: 0.2,
                ease: "easeOut"
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);

  if (entered) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Header />

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative w-full h-screen flex items-center justify-center overflow-hidden"
        >
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background z-10" />
            <Image
              src="/images/studio-a.png"
              alt="Studio A"
              fill
              className="object-cover blur-[2px]"
            />
          </motion.div>

          <div className="relative z-20 text-center px-6 md:px-4 w-full">
            <h1 className="text-5xl md:text-9xl font-black tracking-tighter mb-4 text-accent-yellow uppercase">
              <Typewriter text="THE HUB FOR $UPERSTARS" />
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="text-xs md:text-lg uppercase tracking-[0.2em] mb-12 max-w-3xl mx-auto px-6 md:px-0"
            >
              Welcome to Thirstystudios. The primary hub for superstars to record music and shoot video. Explore our spaces below.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
            >
              <a
                href="#studios"
                className="px-8 py-3 bg-white text-black text-xs tracking-[0.4em] uppercase hover:bg-accent-yellow hover:text-white transition-all transition-colors cursor-pointer inline-block"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#studios')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Studios
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
          >
            <div className="w-px h-12 bg-foreground" />
          </motion.div>
        </motion.section>

        {/* Studios Section */}
        <section id="studios" className="py-20 md:py-32 px-6 md:px-8 max-w-7xl mx-auto">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 text-accent-yellow uppercase">OUR STUDIOS</h1>
            <p className="text-lg md:text-xl opacity-60 max-w-2xl tracking-wide uppercase">
              A world-class environment designed for artists. Top-tier gear and perfect acoustics to help you create your best work.
            </p>
          </motion.header>

          <div className="grid gap-32">
            {studios.map((studio, index) => (
              <motion.div
                key={studio.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}
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
                  <h2 className="text-4xl font-bold tracking-tight uppercase">{studio.name}</h2>
                  <p className="text-lg opacity-80 leading-relaxed font-light">
                    {studio.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {studio.gear.map((item) => (
                      <span key={item} className="text-[10px] uppercase tracking-widest px-3 py-1 bg-studio-gray/50 rounded-full border border-white/5">
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
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="pb-20 md:pb-32 pt-12 md:pt-16 px-6 md:px-8 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 text-accent-yellow uppercase">GET IN TOUCH</h1>
          <p className="text-lg md:text-xl opacity-60 mb-12 uppercase tracking-wide">
            Whether you're looking to book a session, tour the studios, or just have a question, we're here to help.
          </p>

          <ContactForm />
        </motion.section>

        <footer className="mt-32 py-16 border-t border-white/5 text-center w-full">
          <p className="text-xs uppercase tracking-[0.5em] opacity-30">© 2026 THIRSTYSTUDIOS LAGOS</p>
        </footer>
      </main>
    );
  }

  return (
    <AnimatePresence>
      {!entered && (
        <motion.main
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="min-h-screen bg-black flex flex-col items-center justify-center p-4 fixed inset-0 z-[100]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="flex items-center justify-center gap-4 mb-12"
            >
              <Biohazard className="w-10 h-10 md:w-20 md:h-20 text-accent-yellow" />
              <h1 className="text-2xl md:text-7xl font-bold text-foreground/90 uppercase tracking-[0.2em] md:tracking-[0.3em]">
                THIRSTYSTUDIOS
              </h1>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEntered(true)}
              className="group relative px-12 py-4 text-sm tracking-[0.4em] uppercase overflow-hidden border border-foreground/20 transition-all hover:border-accent-yellow"
            >
              <span className="relative z-10 group-hover:text-accent-yellow transition-colors">ENTER</span>
              <div className="absolute inset-0 bg-accent-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left opacity-10" />
            </motion.button>
          </motion.div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}

function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const result = await submitEnquiry({ email, message });
    if (result.success) {
      setStatus("success");
      setEmail("");
      setMessage("");
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-accent-yellow/10 border border-accent-yellow p-8 max-w-xl mx-auto"
      >
        <h3 className="text-accent-yellow font-bold uppercase tracking-widest mb-2">Message Received</h3>
        <p className="text-white/60 text-sm uppercase tracking-wide">We'll get back to you shortly, Superstar.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-[10px] uppercase tracking-widest font-bold border-b border-accent-yellow text-accent-yellow"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form className="grid gap-6 text-left max-w-xl mx-auto" onSubmit={handleSubmit}>
      <div>
        <label className="block text-[10px] uppercase tracking-[0.4em] mb-2 opacity-60">Email Address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="w-full bg-studio-gray/50 border border-white/10 p-4 text-sm focus:border-accent-yellow outline-none transition-colors disabled:opacity-50"
          placeholder="SUPERSTAR@THIRSTY.COM"
        />
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-[0.4em] mb-2 opacity-60">How can we help?</label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "loading"}
          className="w-full bg-studio-gray/50 border border-white/10 p-4 text-sm focus:border-accent-yellow outline-none transition-colors disabled:opacity-50"
          placeholder="YOUR MESSAGE..."
        />
      </div>
      {status === "error" && (
        <p className="text-red-500 text-[10px] uppercase tracking-widest">Failed to send. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-white text-black font-bold text-xs tracking-[0.4em] uppercase hover:bg-accent-yellow hover:text-white transition-all disabled:opacity-50"
      >
        {status === "loading" ? "SENDING..." : "Send Enquiry"}
      </button>
    </form>
  );
}
