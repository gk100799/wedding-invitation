'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { day1 } from '@/lib/data';

export default function Day1() {
  const [petals, setPetals] = useState<{ x: number; delay: number; duration: number; size: number; sway: number }[]>([]);
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const count = isMobile ? 8 : 14;
    setPetals(
      Array.from({ length: count }).map(() => ({
        x: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 14 + Math.random() * 10,
        size: 5 + Math.random() * 7,
        sway: (Math.random() - 0.5) * 60,
      }))
    );
  }, []);

  return (
    <section
      className="scene relative text-deepRose flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #faeeda 0%, #f5c4b3 50%, #f0997b 100%)',
      }}
    >
      {/* Atmosphere layer (sun + petals) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ left: '8%', top: '22%' }}
          whileInView={{
            left: ['8%', '50%', '92%'],
            top: ['22%', '10%', '32%'],
          }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 7, ease: 'easeInOut' }}
          className="absolute w-20 h-20 sm:w-24 sm:h-24 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-full h-full rounded-full bg-marigold relative">
            <div className="absolute inset-0 rounded-full bg-marigold blur-2xl scale-150 opacity-70" />
            <div className="absolute inset-0 rounded-full bg-marigold blur-3xl scale-[3] opacity-30" />
            <motion.div
              className="absolute inset-0 rounded-full border border-marigold/40"
              animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {petals.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-marigold/70 shadow-[0_0_12px_rgba(250,199,117,0.4)]"
            style={{
              left: `${p.x}%`,
              top: '-5%',
              width: p.size,
              height: p.size,
            }}
            animate={{
              top: ['-5%', '105%'],
              x: [0, p.sway, -p.sway, p.sway / 2, 0],
              opacity: [0, 0.85, 0.85, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-5 sm:px-6 pt-14 sm:pt-16 pb-10 sm:pb-12 max-w-2xl mx-auto w-full flex-1 flex flex-col">
        <p className="text-[10px] tracking-[0.3em] text-deepRose/70 mb-2">
          {day1.label.toUpperCase()} · {day1.date.toUpperCase()}
        </p>
        <h2 className="font-display italic text-[clamp(1.6rem,7vw,2.6rem)] leading-[0.95] text-deepRose mb-6 sm:mb-8">
          {day1.mood}.
        </h2>

        <div className="flex flex-col gap-2.5 sm:gap-3" style={{ perspective: 1200 }}>
          {day1.events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, rotateX: -14 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.15 }}
              className="bg-cream/90 backdrop-blur rounded-lg p-3.5 sm:p-4 shadow-lg shadow-deepRose/10"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-baseline justify-between mb-1">
                <p className="font-display italic text-xl sm:text-2xl text-ink">{event.name}</p>
                <p className="text-deepRose text-[11px] sm:text-xs tracking-wider font-medium">
                  {event.time}
                </p>
              </div>
              <p className="text-ink/70 text-xs sm:text-sm mb-1.5 leading-snug">{event.blurb}</p>
              <p className="text-ink/50 text-[10px]">{event.venue}</p>
              <p className="text-deepRose/70 text-[10px] italic mt-0.5">{event.dressCode}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
