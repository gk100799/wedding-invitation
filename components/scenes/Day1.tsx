'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { day1 } from '@/lib/data';

type Petal = { x: number; delay: number; duration: number; size: number; sway: number };
type Sparkle = { x: number; y: number; delay: number; size: number };

export default function Day1() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    setPetals(
      Array.from({ length: isMobile ? 10 : 16 }).map(() => ({
        x: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 16 + Math.random() * 10,
        size: 4 + Math.random() * 6,
        sway: (Math.random() - 0.5) * 70,
      })),
    );
    setSparkles(
      Array.from({ length: isMobile ? 14 : 22 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        size: 1.5 + Math.random() * 1.5,
      })),
    );
  }, []);

  return (
    <section
      className="scene relative text-[#5d3949] flex flex-col"
      style={{
        background:
          'linear-gradient(180deg, #f3f0f5 0%, #e2d4e0 22%, #ecc5cc 50%, #cf9aaa 78%, #8a6776 100%)',
      }}
    >
      {/* Soft watercolor wash circles (modern wedding-stationery) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 18% 30%, rgba(245,232,224,0.55) 0%, transparent 35%), radial-gradient(circle at 82% 70%, rgba(216,164,179,0.45) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(255,240,220,0.25) 0%, transparent 55%)',
        }}
      />

      {/* Twinkling pearls (subtle backdrop) */}
      {sparkles.map((s, i) => (
        <motion.div
          key={`sp-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: '#fff8ed',
            boxShadow: '0 0 6px rgba(255, 248, 237, 0.85)',
          }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 3 + (i % 3),
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Pearl-pale sun (champagne, soft) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ left: '10%', top: '20%' }}
          whileInView={{
            left: ['10%', '52%', '90%'],
            top: ['20%', '8%', '28%'],
          }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 8, ease: 'easeInOut' }}
          className="absolute w-20 h-20 sm:w-24 sm:h-24 -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className="w-full h-full rounded-full"
            style={{ background: '#f5e8d0' }}
          >
            <div
              className="absolute inset-0 rounded-full blur-2xl scale-150 opacity-65"
              style={{ background: '#f5e8d0' }}
            />
            <div
              className="absolute inset-0 rounded-full blur-3xl scale-[3] opacity-35"
              style={{ background: '#fbe4d6' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '1px solid rgba(245, 232, 208, 0.5)' }}
              animate={{ scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Falling rose / cream petals */}
        {petals.map((p, i) => (
          <motion.div
            key={`pt-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: '-5%',
              width: p.size,
              height: p.size,
              background: i % 2 === 0 ? '#f7d8dd' : '#f5e8d8',
              boxShadow:
                i % 2 === 0
                  ? '0 0 10px rgba(247, 216, 221, 0.55)'
                  : '0 0 10px rgba(245, 232, 216, 0.55)',
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

      {/* Decorative thin geometric line (modern stationery) at top */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-[1] flex items-center gap-3 opacity-70">
        <span className="block w-10 h-px bg-[#8a6776]" />
        <span className="block w-1 h-1 rounded-full bg-[#8a6776]" />
        <span className="block w-10 h-px bg-[#8a6776]" />
      </div>

      <div className="relative z-10 px-5 sm:px-6 pt-20 sm:pt-24 pb-14 sm:pb-16 max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center">
        <p className="text-[10px] tracking-[0.3em] text-[#5d3949]/75 mb-2">
          {day1.label.toUpperCase()} · {day1.date.toUpperCase()}
        </p>
        <h2 className="font-display italic text-[clamp(1.5rem,6.5vw,2.4rem)] leading-[0.95] text-[#5d3949] mb-4 sm:mb-6">
          {day1.mood}.
        </h2>

        <div className="flex flex-col gap-2 sm:gap-2.5" style={{ perspective: 1200 }}>
          {day1.events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16, rotateX: -12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.1 }}
              className="bg-[#fffaf2]/95 backdrop-blur rounded-lg p-3 sm:p-3.5 shadow-md"
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: '0 8px 28px -10px rgba(93, 57, 73, 0.25)',
              }}
            >
              <div className="flex items-baseline justify-between mb-0.5">
                <p className="font-display italic text-base sm:text-xl text-ink">{event.name}</p>
                <p className="text-[#8a4d63] text-[11px] tracking-wider font-medium whitespace-nowrap ml-2">
                  {event.time}
                </p>
              </div>
              <p className="text-ink/65 text-[11px] sm:text-xs leading-snug">{event.blurb}</p>
              {event.dressCode !== '—' && (
                <p className="text-[#8a4d63]/75 text-[10px] italic mt-1">{event.dressCode}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
