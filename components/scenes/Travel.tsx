'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { travel, wedding, basePath } from '@/lib/data';

type Leg = typeof travel.outbound | typeof travel.return;

function TicketCard({ leg, delay }: { leg: Leg; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -25 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative w-full max-w-md mx-auto"
      style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
    >
      <div className="relative bg-cream/[0.04] backdrop-blur border border-cream/15 rounded-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 px-5 sm:px-6 pt-5">
          <p className="text-[10px] tracking-[0.3em] text-cream/55 whitespace-nowrap">
            {leg.label.toUpperCase()} · {leg.date.toUpperCase()}
          </p>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-br from-gold/15 to-rose/15 border border-gold/40 shadow-[0_0_20px_rgba(217,177,95,0.15)] self-start sm:self-auto">
            <span className="text-cream/60 text-[8px] sm:text-[9px] tracking-[0.2em] font-body">TRAIN</span>
            <span className="text-gold font-mono text-xs sm:text-sm tracking-wider font-semibold">№ {leg.train}</span>
          </div>
        </div>

        <div className="px-5 sm:px-6 py-6 grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
          <div className="text-left">
            <p className="font-display italic text-3xl sm:text-4xl text-cream leading-none">
              {leg.departure.time}
            </p>
            <p className="text-cream/85 text-sm mt-2">{leg.departure.station}</p>
            <p className="text-cream/45 text-[10px] tracking-[0.2em] mt-0.5">
              {leg.departure.code}
            </p>
          </div>

          <div className="flex flex-col items-center text-cream/40">
            <svg width="44" height="14" viewBox="0 0 44 14" fill="none">
              <line x1="2" y1="7" x2="36" y2="7" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 34 2 L 42 7 L 34 12" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <p className="font-display italic text-[10px] mt-1 text-cream/40">overnight</p>
          </div>

          <div className="text-right">
            <p className="font-display italic text-3xl sm:text-4xl text-cream leading-none">
              {leg.arrival.time}
            </p>
            <p className="text-cream/85 text-sm mt-2">{leg.arrival.station}</p>
            <p className="text-cream/45 text-[10px] tracking-[0.2em] mt-0.5">{leg.arrival.code}</p>
            {'date' in leg.arrival && leg.arrival.date && (
              <p className="text-cream/40 text-[10px] mt-1 italic">{leg.arrival.date}</p>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#050a18]" />
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#050a18]" />
          <div className="border-t border-dashed border-cream/15 mx-5" />
        </div>

        <div className="px-5 sm:px-6 py-4">
          <p className="text-cream/60 text-xs sm:text-sm leading-relaxed italic">{leg.note}</p>
        </div>
      </div>
    </motion.div>
  );
}

function VenueShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative w-full max-w-md mx-auto"
      style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
    >
      {/* Photo card */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-cream/15 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]">
        {wedding.venuePhoto ? (
          <Image
            src={`${basePath}${wedding.venuePhoto}`}
            alt={wedding.venue}
            fill
            sizes="(max-width: 640px) 90vw, 448px"
            className="object-cover"
          />
        ) : (
          // Stylized venue art (no real photo). Set wedding.venuePhoto in lib/data.ts to swap.
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 100%, rgba(250,199,117,0.32) 0%, transparent 55%), radial-gradient(ellipse at 30% 20%, rgba(217,177,95,0.22) 0%, transparent 55%), radial-gradient(ellipse at 70% 30%, rgba(212,83,126,0.32) 0%, transparent 55%), linear-gradient(180deg, #1a0a2e 0%, #2a0d3e 55%, #4a1b48 100%)',
            }}
          >
            {/* Festive twinkling lights */}
            {[...Array(14)].map((_, i) => {
              const x = (i * 73) % 400;
              const y = 25 + ((i * 41) % 70);
              const delay = (i * 0.4) % 3;
              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-gold shadow-[0_0_6px_rgba(217,177,95,0.9)]"
                  style={{ left: `${(x / 400) * 100}%`, top: `${(y / 300) * 100}%` }}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
                  transition={{ duration: 2.5, delay, repeat: Infinity, ease: 'easeInOut' }}
                />
              );
            })}

            <svg
              viewBox="0 0 400 300"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Distant skyline silhouette */}
              <path
                d="M 0 235 L 25 225 L 50 232 L 75 220 L 100 230 L 130 222 L 270 222 L 300 230 L 325 220 L 350 232 L 380 225 L 400 230 L 400 245 L 0 245 Z"
                fill="rgba(245,237,224,0.06)"
              />

              {/* String-light arc across top */}
              <path
                d="M -10 60 Q 100 90 200 75 Q 300 90 410 60"
                fill="none"
                stroke="rgba(245,237,224,0.18)"
                strokeWidth="0.6"
              />
              {[20, 60, 110, 160, 200, 240, 290, 340, 380].map((cx, i) => {
                const cy = 75 + Math.cos(((cx - 200) / 200) * Math.PI) * 12;
                return (
                  <g key={`ll-${i}`}>
                    <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 4} stroke="rgba(245,237,224,0.18)" strokeWidth="0.5" />
                    <circle cx={cx} cy={cy + 6} r="1.6" fill="rgba(250,199,117,0.85)" />
                    <circle cx={cx} cy={cy + 6} r="3.5" fill="rgba(250,199,117,0.18)" />
                  </g>
                );
              })}

              {/* Hanging garland of marigolds */}
              <path
                d="M 30 110 Q 200 165 370 110"
                fill="none"
                stroke="rgba(212,83,126,0.45)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((mx, i) => {
                const my = 110 + Math.sin(((mx - 200) / 170) * Math.PI) * 30;
                return (
                  <circle
                    key={`mar-${i}`}
                    cx={mx}
                    cy={my}
                    r="2.6"
                    fill="rgba(250,199,117,0.85)"
                  />
                );
              })}

              {/* Side mini pavilion (left) */}
              <g>
                <rect x="62" y="172" width="48" height="68" fill="rgba(245,237,224,0.42)" />
                <path d="M 60 172 Q 60 144 86 144 Q 112 144 112 172 Z" fill="rgba(245,237,224,0.5)" stroke="rgba(217,177,95,0.55)" strokeWidth="0.6" />
                <line x1="86" y1="144" x2="86" y2="124" stroke="rgba(217,177,95,0.7)" strokeWidth="1.4" />
                <circle cx="86" cy="121" r="2" fill="rgba(217,177,95,0.95)" />
                <rect x="79" y="190" width="14" height="22" fill="rgba(250,199,117,0.32)" />
              </g>

              {/* Side mini pavilion (right) */}
              <g>
                <rect x="290" y="172" width="48" height="68" fill="rgba(245,237,224,0.42)" />
                <path d="M 288 172 Q 288 144 314 144 Q 340 144 340 172 Z" fill="rgba(245,237,224,0.5)" stroke="rgba(217,177,95,0.55)" strokeWidth="0.6" />
                <line x1="314" y1="144" x2="314" y2="124" stroke="rgba(217,177,95,0.7)" strokeWidth="1.4" />
                <circle cx="314" cy="121" r="2" fill="rgba(217,177,95,0.95)" />
                <rect x="307" y="190" width="14" height="22" fill="rgba(250,199,117,0.32)" />
              </g>

              {/* Central palace block */}
              <rect x="130" y="148" width="140" height="92" fill="rgba(245,237,224,0.55)" />

              {/* Central onion dome */}
              <path
                d="M 138 148 Q 138 88 200 88 Q 262 88 262 148 Z"
                fill="rgba(245,237,224,0.68)"
                stroke="rgba(217,177,95,0.7)"
                strokeWidth="0.8"
              />
              {/* Dome ribs */}
              <path d="M 200 88 Q 175 110 175 148" fill="none" stroke="rgba(217,177,95,0.4)" strokeWidth="0.5" />
              <path d="M 200 88 Q 225 110 225 148" fill="none" stroke="rgba(217,177,95,0.4)" strokeWidth="0.5" />

              {/* Central spire */}
              <line x1="200" y1="88" x2="200" y2="58" stroke="rgba(217,177,95,0.85)" strokeWidth="1.8" />
              <circle cx="200" cy="55" r="3" fill="rgba(217,177,95,0.95)" />
              <line x1="195" y1="62" x2="205" y2="62" stroke="rgba(217,177,95,0.7)" strokeWidth="0.8" />

              {/* Decorative arched windows */}
              <path d="M 152 192 Q 152 178 162 178 Q 172 178 172 192 L 172 210 L 152 210 Z" fill="rgba(250,199,117,0.32)" stroke="rgba(217,177,95,0.45)" strokeWidth="0.5" />
              <path d="M 228 192 Q 228 178 238 178 Q 248 178 248 192 L 248 210 L 228 210 Z" fill="rgba(250,199,117,0.32)" stroke="rgba(217,177,95,0.45)" strokeWidth="0.5" />

              {/* Central archway entrance */}
              <path
                d="M 178 240 L 178 200 Q 178 172 200 172 Q 222 172 222 200 L 222 240 Z"
                fill="rgba(250,199,117,0.42)"
                stroke="rgba(217,177,95,0.65)"
                strokeWidth="0.8"
              />
              {/* Glow inside arch */}
              <ellipse cx="200" cy="216" rx="16" ry="22" fill="rgba(250,199,117,0.55)" />
              <ellipse cx="200" cy="216" rx="22" ry="28" fill="rgba(250,199,117,0.18)" />

              {/* Hanging diya lanterns flanking arch */}
              <g>
                <line x1="170" y1="172" x2="170" y2="200" stroke="rgba(217,177,95,0.45)" strokeWidth="0.5" />
                <circle cx="170" cy="202" r="2.2" fill="rgba(250,199,117,0.95)" />
                <circle cx="170" cy="202" r="5" fill="rgba(250,199,117,0.25)" />
              </g>
              <g>
                <line x1="230" y1="172" x2="230" y2="200" stroke="rgba(217,177,95,0.45)" strokeWidth="0.5" />
                <circle cx="230" cy="202" r="2.2" fill="rgba(250,199,117,0.95)" />
                <circle cx="230" cy="202" r="5" fill="rgba(250,199,117,0.25)" />
              </g>

              {/* Steps */}
              <rect x="158" y="240" width="84" height="6" fill="rgba(245,237,224,0.4)" />
              <rect x="140" y="246" width="120" height="6" fill="rgba(245,237,224,0.32)" />
              <rect x="118" y="252" width="164" height="8" fill="rgba(245,237,224,0.24)" />

              {/* Foreground floral border */}
              {[20, 50, 80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380].map((x, i) => (
                <circle
                  key={`f-${i}`}
                  cx={x}
                  cy={272 + (i % 2) * 4}
                  r="1.6"
                  fill={i % 3 === 0 ? 'rgba(212,83,126,0.55)' : 'rgba(250,199,117,0.55)'}
                />
              ))}
            </svg>
          </div>
        )}
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 80px rgba(0,0,0,0.55)' }}
        />
        {/* Caption overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <p className="text-[10px] tracking-[0.3em] text-gold mb-1.5">THE VENUE</p>
          <p className="font-display italic text-cream text-2xl sm:text-3xl leading-tight">
            {wedding.venue}
          </p>
          <p className="text-cream/70 text-xs sm:text-sm mt-1">{wedding.city} · Karnataka</p>
        </div>
      </div>

      {/* Maps button */}
      <div className="mt-6 flex justify-center">
        <a
          href={wedding.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-cream/25 text-cream/90 text-xs tracking-[0.2em] hover:border-gold hover:text-gold transition-colors backdrop-blur-sm bg-cream/[0.03]"
        >
          OPEN IN GOOGLE MAPS
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

export default function Travel() {
  const ref = useRef<HTMLDivElement>(null);
  const [showTrain, setShowTrain] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setShowTrain(params.has('travel'));
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const lineY = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section
      ref={ref}
      className="scene relative bg-[#050a18] text-cream flex flex-col"
    >
      <div
        className={`scene-scroll w-full flex-1 min-h-0 flex flex-col items-center px-4 ${
          showTrain ? 'py-10 sm:py-14' : 'justify-center py-12 sm:py-16'
        }`}
      >
      <div className="max-w-md text-center mb-8 sm:mb-12">
        <p className="text-[10px] tracking-[0.3em] text-cream/50 mb-3">
          {showTrain ? 'THE JOURNEY' : 'WHERE'}
        </p>
        <h2 className="font-display italic text-[clamp(1.8rem,7vw,2.6rem)] leading-[1.1] text-cream">
          {showTrain ? (
            <>
              from bangalore,<br />with sleep.
            </>
          ) : (
            <>
              where it all<br />comes together.
            </>
          )}
        </h2>
        {showTrain && (
          <p className="text-cream/55 text-sm mt-5 leading-relaxed">
            Two trains, one wedding. Here is how to get there and back.
          </p>
        )}
      </div>

      {showTrain ? (
        <>
          <div className="relative w-px self-center bg-cream/10 hidden sm:block" style={{ minHeight: '40px' }}>
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose"
              style={{ top: lineY }}
            />
          </div>

          <div className="w-full flex flex-col gap-8 sm:gap-10 items-center">
            <TicketCard leg={travel.outbound} delay={0} />
            <TicketCard leg={travel.return} delay={0.1} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-14 sm:mt-20 max-w-md w-full text-center px-2"
          >
            <p className="text-[10px] tracking-[0.3em] text-cream/50 mb-3">THE VENUE</p>
            <p className="font-display italic text-2xl sm:text-3xl text-cream leading-tight mb-1">
              {wedding.venue}
            </p>
            <p className="text-cream/55 text-sm mb-6">{wedding.city}</p>
            <a
              href={wedding.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-cream/25 text-cream/85 text-xs tracking-[0.18em] hover:border-rose hover:text-rose transition-colors"
            >
              OPEN IN GOOGLE MAPS
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          </motion.div>
        </>
      ) : (
        <VenueShowcase />
      )}
      </div>
    </section>
  );
}
