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
          // Placeholder — replace by setting wedding.venuePhoto in lib/data.ts
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 30% 30%, rgba(217,177,95,0.4) 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(212,83,126,0.4) 0%, transparent 55%), linear-gradient(135deg, #2a0d3e 0%, #4a1b48 100%)',
            }}
          >
            {/* Soft architectural silhouette hint */}
            <svg
              viewBox="0 0 400 300"
              className="absolute bottom-0 left-0 right-0 w-full opacity-25"
              preserveAspectRatio="xMidYMax meet"
            >
              <path
                d="M0,300 L0,180 L40,180 L40,140 L80,140 L80,180 L120,180 L120,100 L150,70 L180,100 L180,180 L220,180 L220,90 L260,60 L300,90 L300,180 L340,180 L340,150 L380,150 L380,180 L400,180 L400,300 Z"
                fill="rgba(245,237,224,0.55)"
              />
              <path
                d="M150,70 L150,30 M260,60 L260,20 L268,20 L268,60"
                stroke="rgba(245,237,224,0.5)"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] tracking-[0.2em] text-cream/50 border border-cream/20 bg-cream/[0.03]">
              PHOTO PLACEHOLDER
            </div>
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
      className="scene relative bg-[#050a18] text-cream py-16 sm:py-20 px-4 flex flex-col items-center justify-center"
    >
      <div className="max-w-md text-center mb-10 sm:mb-12">
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
    </section>
  );
}
