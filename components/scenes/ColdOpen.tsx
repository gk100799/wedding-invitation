'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { wedding } from '@/lib/data';

type Star = { x: number; y: number; d: number; s: number; gold: boolean };

export default function ColdOpen() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const count = isMobile ? 55 : 110;
    const arr: Star[] = Array.from({ length: count }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: Math.random() * 4 + 2,
      s: Math.random() * 0.8 + 0.2,
      gold: Math.random() < 0.18,
    }));
    setStars(arr);
  }, []);

  const words = ["you're", 'invited.'];

  return (
    <section className="scene bg-ink flex flex-col items-center justify-center text-cream relative overflow-hidden">
      {/* Layered radial glows */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(212,83,126,0.22) 0%, transparent 55%)',
        }}
        animate={{ opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(217,177,95,0.10) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Twinkling stars (some gold) */}
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${s.gold ? 'bg-gold' : 'bg-cream'} ${
            s.gold ? 'shadow-[0_0_6px_rgba(217,177,95,0.8)]' : ''
          }`}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.gold ? 3 : 2,
            height: s.gold ? 3 : 2,
            opacity: s.s,
          }}
          animate={{ opacity: [s.s * 0.2, s.s, s.s * 0.2], scale: [1, 1.6, 1] }}
          transition={{ duration: s.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Sonar rings expanding */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-rose/45"
          style={{ width: 18, height: 18 }}
          animate={{ scale: [1, 32], opacity: [0.7, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.3,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Centerpiece dot with pulsing aura */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-[10px] h-[10px] rounded-full bg-rose mb-12 relative z-10"
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-rose blur-md"
          animate={{ scale: [3, 5, 3], opacity: [0.5, 0.95, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* "SAVE THE DATE" pre-text — letter-spacing expands as it appears */}
      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.1em' }}
        animate={{ opacity: 0.7, letterSpacing: '0.4em' }}
        transition={{ delay: 0.6, duration: 1.4 }}
        className="text-[10px] text-cream/65 mb-4 relative z-10 uppercase font-body"
      >
        save the date
      </motion.p>

      {/* Heading — word-by-word reveal with blur-in */}
      <h1 className="font-display italic text-[clamp(2.4rem,10vw,5rem)] text-cream text-center px-6 leading-[0.95] relative z-10 flex gap-3 flex-wrap justify-center">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 1.2 + i * 0.25, duration: 1.0 }}
          >
            {word}
          </motion.span>
        ))}
      </h1>

      {/* Sub-line */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 2.2, duration: 1.2 }}
        className="font-display italic text-cream/85 text-base sm:text-lg mt-6 relative z-10 px-6 text-center"
      >
        to a wedding. yes, actually.
      </motion.p>

      {/* Date hint — flanked, gold-glowing pill */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="relative z-10 mt-7 flex items-center gap-3 sm:gap-4"
      >
        <motion.span
          className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold"
          initial={{ scaleX: 0, transformOrigin: 'right' }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 3.0, duration: 0.8 }}
        />
        <p className="text-[13px] sm:text-sm tracking-[0.35em] text-gold uppercase font-body font-semibold drop-shadow-[0_0_10px_rgba(217,177,95,0.55)]">
          {wedding.city} · {wedding.date}
        </p>
        <motion.span
          className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold"
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 3.0, duration: 0.8 }}
        />
      </motion.div>

      {/* Scroll prompt — glowing pill + animated double chevron */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.6, duration: 1 }}
        className="absolute bottom-10 sm:bottom-14 flex flex-col items-center"
      >
        <motion.div
          className="relative"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 rounded-full bg-rose/25 blur-2xl scale-150" />
          <div className="absolute inset-0 rounded-full bg-gold/12 blur-3xl scale-[2]" />
          <div className="relative px-5 py-2.5 rounded-full border border-cream/35 bg-cream/[0.04] backdrop-blur-sm">
            <p className="text-[10px] sm:text-[11px] tracking-[0.4em] text-cream/95 uppercase font-body font-medium">
              scroll to begin
            </p>
          </div>
        </motion.div>
        <motion.div
          className="mt-3 flex flex-col items-center text-cream/85"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M5 8l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" className="opacity-50 -mt-3">
            <path d="M5 4l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
