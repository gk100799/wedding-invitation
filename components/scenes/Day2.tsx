'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { day2 } from '@/lib/data';

type Diya = { x: number; y: number; s: number; d: number };
type Petal = { x: number; delay: number; duration: number; size: number; sway: number };

export default function Day2() {
  const [diyas, setDiyas] = useState<Diya[]>([]);
  const [petals, setPetals] = useState<Petal[]>([]);
  const [isMadhu, setIsMadhu] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsMadhu(params.has('madhu'));

    const isMobile = window.innerWidth < 640;
    const diyaCount = isMobile ? 18 : 30;
    setDiyas(
      Array.from({ length: diyaCount }).map(() => ({
        x: Math.random() * 100,
        y: 12 + Math.random() * 70,
        s: Math.random() * 0.6 + 0.4,
        d: Math.random() * 3 + 2,
      })),
    );
    const petalCount = isMobile ? 8 : 14;
    setPetals(
      Array.from({ length: petalCount }).map(() => ({
        x: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 16 + Math.random() * 10,
        size: 5 + Math.random() * 7,
        sway: (Math.random() - 0.5) * 70,
      })),
    );
  }, []);

  return (
    <section
      className="scene relative text-deepRose flex flex-col"
      style={{
        background:
          'linear-gradient(180deg, #fff4d6 0%, #fac775 28%, #f0997b 62%, #b94468 100%)',
      }}
    >
      {/* Warm radial glows (sun + temple courtyard light) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 78% 18%, rgba(255,235,170,0.6) 0%, transparent 45%), radial-gradient(ellipse at 20% 80%, rgba(212,83,126,0.18) 0%, transparent 55%)',
        }}
      />

      {/* Sun (warm top-right) */}
      <div className="absolute top-10 right-6 sm:top-14 sm:right-12 w-16 h-16 sm:w-24 sm:h-24 rounded-full">
        <div className="absolute inset-0 rounded-full bg-marigold" />
        <div className="absolute inset-0 rounded-full bg-marigold blur-2xl scale-150 opacity-90" />
        <div className="absolute inset-0 rounded-full bg-marigold blur-3xl scale-[3] opacity-50" />
        <motion.div
          className="absolute inset-0 rounded-full border border-marigold/60"
          animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeOut' }}
        />
      </div>

      {/* Toran (mango-leaf festoon) across top */}
      <svg
        className="absolute top-0 left-0 right-0 w-full pointer-events-none"
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        style={{ height: '52px' }}
        aria-hidden
      >
        <path d="M 0 8 Q 100 36 200 22 Q 300 36 400 8" fill="none" stroke="rgba(153,53,86,0.6)" strokeWidth="1" />
        {[12, 38, 64, 90, 116, 142, 168, 194, 220, 246, 272, 298, 324, 350, 376, 392].map((cx, i) => {
          const cy = 8 + Math.cos(((cx - 200) / 200) * Math.PI) * -16 + 14;
          const isFlower = i % 3 === 0;
          return isFlower ? (
            <g key={`tor-${i}`}>
              {[0, 1, 2, 3, 4].map((j) => {
                const a = ((j * 72 - 90) * Math.PI) / 180;
                return (
                  <ellipse
                    key={j}
                    cx={cx + Math.cos(a) * 2.4}
                    cy={cy + Math.sin(a) * 2.4}
                    rx="1.6"
                    ry="2.6"
                    fill="rgba(250,199,117,0.95)"
                  />
                );
              })}
              <circle cx={cx} cy={cy} r="1.4" fill="rgba(212,83,126,0.85)" />
            </g>
          ) : (
            <ellipse
              key={`tor-${i}`}
              cx={cx}
              cy={cy + 4}
              rx="2.2"
              ry="4.4"
              fill="rgba(60,130,70,0.7)"
              stroke="rgba(40,90,50,0.85)"
              strokeWidth="0.4"
            />
          );
        })}
      </svg>

      {/* Twinkling diyas (warm gold dots) */}
      {diyas.map((d, i) => (
        <motion.div
          key={`d-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: 3,
            height: 3,
            background: '#fac775',
            boxShadow: '0 0 8px rgba(250,199,117,0.95)',
            opacity: d.s,
          }}
          animate={{ opacity: [d.s * 0.35, d.s, d.s * 0.35], scale: [1, 1.4, 1] }}
          transition={{ duration: d.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Drifting petals */}
      {petals.map((p, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute rounded-full bg-rose/65 shadow-[0_0_10px_rgba(212,83,126,0.4)]"
          style={{
            left: `${p.x}%`,
            top: '-5%',
            width: p.size,
            height: p.size,
          }}
          animate={{
            top: ['-5%', '105%'],
            x: [0, p.sway, -p.sway, p.sway / 2, 0],
            opacity: [0, 0.8, 0.8, 0],
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

      <div className="relative z-10 px-5 sm:px-6 pt-16 sm:pt-20 pb-14 sm:pb-16 max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center">
        <p className="text-[10px] tracking-[0.3em] text-deepRose/80 mb-2">
          {day2.label.toUpperCase()} · {day2.date.toUpperCase()}
        </p>
        <h2 className="font-display italic text-[clamp(1.5rem,6.5vw,2.4rem)] leading-[0.95] text-deepRose mb-4 sm:mb-6">
          {day2.mood}.
        </h2>

        <div className="flex flex-col gap-2 sm:gap-2.5" style={{ perspective: 1200 }}>
          {day2.events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16, rotateX: -12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.1 }}
              className="bg-cream/90 backdrop-blur border border-deepRose/20 rounded-lg p-3 sm:p-3.5 shadow-md shadow-deepRose/15"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-baseline justify-between mb-0.5">
                <p className="font-display italic text-base sm:text-xl text-ink">{event.name}</p>
                <p className="text-deepRose text-[11px] tracking-wider font-medium whitespace-nowrap ml-2">
                  {event.time}
                </p>
              </div>
              <p className="text-ink/70 text-[11px] sm:text-xs leading-snug">{event.blurb}</p>
              {!isMadhu && event.dressCode !== '—' && (
                <p className="text-deepRose/80 text-[10px] italic mt-1">{event.dressCode}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
