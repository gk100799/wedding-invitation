'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { couple } from '@/lib/data';

export default function MatchScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Phone scales/rotates as scroll progresses
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.05]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20]);
  const matchOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <section ref={ref} className="scene bg-ink flex flex-col text-cream relative overflow-hidden">
      {/* Ambient radial glow behind the phone */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(212,83,126,0.18) 0%, transparent 60%)',
        }}
      />

      <div className="flex-1 flex items-center justify-center px-4 relative">
        {/* Sparkles orbiting the phone */}
        {[...Array(10)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 10;
          const radius = 52;
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gold shadow-[0_0_8px_rgba(217,177,95,0.9)] pointer-events-none"
              style={{
                left: `calc(50% + ${Math.cos(angle) * radius}%)`,
                top: `calc(50% + ${Math.sin(angle) * radius * 0.6}%)`,
              }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.6, 0] }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          );
        })}

        <motion.div
          style={{ scale, rotateY, perspective: 1000, transformStyle: 'preserve-3d' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          {/* Phone frame */}
          <div className="w-[230px] sm:w-[280px] aspect-[260/520] bg-[#1a1a1a] rounded-[36px] p-2 shadow-[0_30px_80px_-20px_rgba(212,83,126,0.5)]">
            <div className="w-full h-full rounded-[28px] overflow-hidden bg-rose flex flex-col items-center justify-center px-5 relative">
              <motion.div
                style={{ opacity: matchOpacity }}
                className="text-center"
              >
                <p className="font-display italic text-2xl sm:text-3xl text-cream mb-3">It's a match.</p>
                <div className="mb-5 leading-tight">
                  <p className="font-display italic text-xl sm:text-2xl text-gold drop-shadow-[0_0_8px_rgba(217,177,95,0.5)]">
                    {couple.groom.name}
                  </p>
                  <p className="font-display italic text-cream/95 text-base sm:text-lg my-1">&amp;</p>
                  <p className="font-display italic text-xl sm:text-2xl text-gold drop-shadow-[0_0_8px_rgba(217,177,95,0.5)]">
                    {couple.bride.name}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-cream/65 mt-2 tracking-wide">
                    have liked each other.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-cream flex items-center justify-center text-deepRose font-medium border-2 border-white shadow-lg">
                    {couple.groom.initial}
                  </div>
                  <motion.span
                    className="text-cream text-xl"
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    ♥
                  </motion.span>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-cream flex items-center justify-center text-deepRose font-medium border-2 border-white shadow-lg">
                    {couple.bride.initial}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <p className="text-[10px] tracking-[0.3em] text-cream/40 px-4 text-center pb-12 sm:pb-10">
        LIKED · MATCHED · MARRYING
      </p>
    </section>
  );
}
