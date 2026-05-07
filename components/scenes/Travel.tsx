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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 px-4 sm:px-5 pt-3 sm:pt-4">
          <p className="text-[10px] tracking-[0.3em] text-cream/55 whitespace-nowrap">
            {leg.label.toUpperCase()} · {leg.date.toUpperCase()}
          </p>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-gradient-to-br from-gold/15 to-rose/15 border border-gold/40 self-start sm:self-auto">
            <span className="text-cream/60 text-[8px] sm:text-[9px] tracking-[0.2em] font-body">TRAIN</span>
            <span className="text-gold font-mono text-[11px] sm:text-xs tracking-wider font-semibold">№ {leg.train}</span>
          </div>
        </div>

        <div className="px-4 sm:px-5 py-3 sm:py-4 grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
          <div className="text-left">
            <p className="font-display italic text-2xl sm:text-3xl text-cream leading-none">
              {leg.departure.time}
            </p>
            <p className="text-cream/85 text-[11px] sm:text-sm mt-1">{leg.departure.station}</p>
            <p className="text-cream/45 text-[9px] tracking-[0.2em] mt-0.5">
              {leg.departure.code}
            </p>
          </div>

          <div className="flex flex-col items-center text-cream/40">
            <svg width="40" height="12" viewBox="0 0 44 14" fill="none">
              <line x1="2" y1="7" x2="36" y2="7" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 34 2 L 42 7 L 34 12" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <p className="font-display italic text-[9px] mt-0.5 text-cream/40">overnight</p>
          </div>

          <div className="text-right">
            <p className="font-display italic text-2xl sm:text-3xl text-cream leading-none">
              {leg.arrival.time}
            </p>
            <p className="text-cream/85 text-[11px] sm:text-sm mt-1">{leg.arrival.station}</p>
            <p className="text-cream/45 text-[9px] tracking-[0.2em] mt-0.5">{leg.arrival.code}</p>
            {'date' in leg.arrival && leg.arrival.date && (
              <p className="text-cream/40 text-[9px] mt-0.5 italic">{leg.arrival.date}</p>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#050a18]" />
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#050a18]" />
          <div className="border-t border-dashed border-cream/15 mx-5" />
        </div>

        <div className="px-4 sm:px-5 py-2.5">
          <p className="text-cream/60 text-[11px] sm:text-xs leading-snug italic">{leg.note}</p>
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
          <div className="absolute inset-0 bg-gradient-to-br from-[#2a0d3e] via-[#4a1b48] to-[#1a0a2e]" />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 80px rgba(0,0,0,0.55)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <p className="text-[10px] tracking-[0.3em] text-gold mb-1.5">THE VENUE</p>
          <p className="font-display italic text-cream text-2xl sm:text-3xl leading-tight">
            {wedding.venue}
          </p>
          <p className="text-cream/70 text-xs sm:text-sm mt-1">{wedding.city} · Karnataka</p>
        </div>
      </div>

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
      className="scene relative bg-[#050a18] text-cream flex flex-col items-center justify-center px-4 py-14 sm:py-20"
    >
      <div className="max-w-md text-center mb-6 sm:mb-10">
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

          <div className="w-full flex flex-col gap-4 sm:gap-6 items-center">
            <TicketCard leg={travel.outbound} delay={0} />
            <TicketCard leg={travel.return} delay={0.1} />
          </div>

          <a
            href={wedding.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-md border border-cream/25 text-cream/85 text-[11px] tracking-[0.2em] hover:border-rose hover:text-rose transition-colors"
          >
            VENUE ON GOOGLE MAPS
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
        </>
      ) : (
        <VenueShowcase />
      )}
    </section>
  );
}
