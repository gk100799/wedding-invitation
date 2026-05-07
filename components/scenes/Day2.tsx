'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { day2 } from '@/lib/data';

type Star = { x: number; y: number; s: number; d: number; color: string; size: number };
type Shooting = { topStart: number; leftStart: number; angle: number; delay: number; duration: number };

export default function Day2() {
  const [stars, setStars] = useState<Star[]>([]);
  const [shooters, setShooters] = useState<Shooting[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const count = isMobile ? 50 : 100;
    const palette = ['#f5ede0', '#f5ede0', '#f5ede0', '#fac775', '#f0a8c1', '#d9b15f'];
    const arr: Star[] = Array.from({ length: count }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 70,
      s: Math.random() * 0.8 + 0.2,
      d: Math.random() * 4 + 2,
      color: palette[Math.floor(Math.random() * palette.length)],
      size: 1 + Math.random() * 2.2,
    }));
    setStars(arr);

    setShooters(
      Array.from({ length: 3 }).map((_, i) => ({
        topStart: 5 + Math.random() * 25,
        leftStart: 70 + Math.random() * 20,
        angle: 25 + Math.random() * 15,
        delay: i * 5 + Math.random() * 3,
        duration: 1.2 + Math.random() * 0.6,
      }))
    );
  }, []);

  return (
    <section
      className="scene relative text-cream"
      style={{
        background: 'linear-gradient(180deg, #1a0a2e 0%, #2a0d3e 50%, #4a1b48 100%)',
      }}
    >
      {/* Layered nebula glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 80% 20%, rgba(217,177,95,0.10) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(212,83,126,0.12) 0%, transparent 50%)',
        }}
      />

      {/* Stars (varied colors and sizes) */}
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
            opacity: s.s,
          }}
          animate={{ opacity: [s.s * 0.3, s.s, s.s * 0.3] }}
          transition={{ duration: s.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Shooting stars */}
      {shooters.map((sh, i) => (
        <motion.div
          key={`sh-${i}`}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-cream to-transparent"
          style={{
            top: `${sh.topStart}%`,
            left: `${sh.leftStart}%`,
            width: 120,
            transform: `rotate(${sh.angle}deg)`,
            transformOrigin: 'left center',
          }}
          animate={{
            opacity: [0, 1, 0],
            x: [0, 320],
            y: [0, 180],
          }}
          transition={{
            duration: sh.duration,
            delay: sh.delay,
            repeat: Infinity,
            repeatDelay: 12 + Math.random() * 6,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Moon */}
      <div className="absolute top-12 right-8 sm:right-16 w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-cream/90">
        <div className="absolute inset-0 rounded-full bg-cream blur-2xl scale-150 opacity-30" />
        <motion.div
          className="absolute inset-0 rounded-full border border-cream/30"
          animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeOut' }}
        />
      </div>

      <div className="relative z-10 px-5 sm:px-6 pt-14 sm:pt-16 pb-10 sm:pb-12 max-w-2xl mx-auto">
        <p className="text-[10px] tracking-[0.3em] text-cream/60 mb-2">
          {day2.label.toUpperCase()} · {day2.date.toUpperCase()}
        </p>
        <h2 className="font-display italic text-[clamp(1.6rem,7vw,2.6rem)] leading-[0.95] text-cream mb-6 sm:mb-8">
          {day2.mood}.
        </h2>

        <div className="flex flex-col gap-2.5 sm:gap-3" style={{ perspective: 1200 }}>
          {day2.events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, rotateX: -14 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.15 }}
              className="bg-cream/[0.05] backdrop-blur border border-cream/15 rounded-lg p-3.5 sm:p-4 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-baseline justify-between mb-1">
                <p className="font-display italic text-xl sm:text-2xl text-cream">{event.name}</p>
                <p className="text-rose text-[11px] sm:text-xs tracking-wider font-medium">
                  {event.time}
                </p>
              </div>
              <p className="text-cream/70 text-xs sm:text-sm mb-1.5 leading-snug">{event.blurb}</p>
              <p className="text-cream/50 text-[10px]">{event.venue}</p>
              <p className="text-rose/80 text-[10px] italic mt-0.5">{event.dressCode}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
