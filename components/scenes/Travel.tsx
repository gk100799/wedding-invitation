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

              {/* Subsidiary curvilinear shikhara — left */}
              <g>
                {/* Sub-mandapa base */}
                <rect x="58" y="200" width="50" height="40" fill="rgba(245,237,224,0.45)" />
                <rect x="55" y="196" width="56" height="4" fill="rgba(245,237,224,0.5)" />
                {/* Curvilinear shikhara silhouette (Nagara style) */}
                <path
                  d="M 60 196 C 60 178, 66 160, 75 144 C 80 134, 84 124, 86 114 C 88 124, 92 134, 97 144 C 106 160, 112 178, 112 196 Z"
                  fill="rgba(245,237,224,0.55)"
                  stroke="rgba(217,177,95,0.5)"
                  strokeWidth="0.5"
                />
                {/* Horizontal moldings */}
                <line x1="62" y1="180" x2="110" y2="180" stroke="rgba(217,177,95,0.32)" strokeWidth="0.4" />
                <line x1="66" y1="164" x2="106" y2="164" stroke="rgba(217,177,95,0.32)" strokeWidth="0.4" />
                <line x1="72" y1="148" x2="100" y2="148" stroke="rgba(217,177,95,0.32)" strokeWidth="0.4" />
                <line x1="78" y1="132" x2="94" y2="132" stroke="rgba(217,177,95,0.32)" strokeWidth="0.4" />
                {/* Vertical center rib */}
                <line x1="86" y1="114" x2="86" y2="196" stroke="rgba(217,177,95,0.3)" strokeWidth="0.4" />
                {/* Amalaka + kalasha */}
                <ellipse cx="86" cy="113" rx="3.5" ry="1.3" fill="rgba(217,177,95,0.65)" stroke="rgba(217,177,95,0.85)" strokeWidth="0.4" />
                <ellipse cx="86" cy="109" rx="1.8" ry="1.3" fill="rgba(217,177,95,0.95)" />
                <line x1="86" y1="107" x2="86" y2="102" stroke="rgba(217,177,95,0.85)" strokeWidth="0.7" />
                <circle cx="86" cy="100" r="1" fill="rgba(217,177,95,1)" />
                {/* Lit window */}
                <rect x="78" y="216" width="14" height="20" fill="rgba(250,199,117,0.32)" />
              </g>

              {/* Subsidiary curvilinear shikhara — right (mirror) */}
              <g>
                <rect x="292" y="200" width="50" height="40" fill="rgba(245,237,224,0.45)" />
                <rect x="289" y="196" width="56" height="4" fill="rgba(245,237,224,0.5)" />
                <path
                  d="M 294 196 C 294 178, 300 160, 309 144 C 314 134, 318 124, 320 114 C 322 124, 326 134, 331 144 C 340 160, 346 178, 346 196 Z"
                  fill="rgba(245,237,224,0.55)"
                  stroke="rgba(217,177,95,0.5)"
                  strokeWidth="0.5"
                />
                <line x1="296" y1="180" x2="344" y2="180" stroke="rgba(217,177,95,0.32)" strokeWidth="0.4" />
                <line x1="300" y1="164" x2="340" y2="164" stroke="rgba(217,177,95,0.32)" strokeWidth="0.4" />
                <line x1="306" y1="148" x2="334" y2="148" stroke="rgba(217,177,95,0.32)" strokeWidth="0.4" />
                <line x1="312" y1="132" x2="328" y2="132" stroke="rgba(217,177,95,0.32)" strokeWidth="0.4" />
                <line x1="320" y1="114" x2="320" y2="196" stroke="rgba(217,177,95,0.3)" strokeWidth="0.4" />
                <ellipse cx="320" cy="113" rx="3.5" ry="1.3" fill="rgba(217,177,95,0.65)" stroke="rgba(217,177,95,0.85)" strokeWidth="0.4" />
                <ellipse cx="320" cy="109" rx="1.8" ry="1.3" fill="rgba(217,177,95,0.95)" />
                <line x1="320" y1="107" x2="320" y2="102" stroke="rgba(217,177,95,0.85)" strokeWidth="0.7" />
                <circle cx="320" cy="100" r="1" fill="rgba(217,177,95,1)" />
                <rect x="312" y="216" width="14" height="20" fill="rgba(250,199,117,0.32)" />
              </g>

              {/* Mandapa (pillared hall) */}
              <rect x="120" y="170" width="160" height="70" fill="rgba(245,237,224,0.55)" />

              {/* Cornice / eaves above mandapa (chajja) */}
              <rect x="116" y="166" width="168" height="4" fill="rgba(245,237,224,0.62)" />
              <rect x="113" y="162" width="174" height="3" fill="rgba(245,237,224,0.55)" />
              <rect x="110" y="158" width="180" height="3" fill="rgba(245,237,224,0.5)" />

              {/* Carved horizontal band (frieze) under cornice */}
              <line x1="120" y1="174" x2="280" y2="174" stroke="rgba(217,177,95,0.5)" strokeWidth="0.5" />
              {[128, 138, 148, 158, 168, 232, 242, 252, 262, 272].map((bx) => (
                <circle key={`fz-${bx}`} cx={bx} cy="172" r="0.8" fill="rgba(217,177,95,0.7)" />
              ))}

              {/* Mandapa pillars (with capitals and bases) */}
              {[130, 150, 250, 270].map((px) => (
                <g key={`mp-${px}`}>
                  <rect x={px - 4} y="167" width="8" height="3" fill="rgba(245,237,224,0.65)" />
                  <rect x={px - 3} y="170" width="6" height="2" fill="rgba(245,237,224,0.7)" />
                  <line x1={px} y1="172" x2={px} y2="237" stroke="rgba(217,177,95,0.4)" strokeWidth="0.7" />
                  <rect x={px - 3} y="237" width="6" height="3" fill="rgba(245,237,224,0.6)" />
                </g>
              ))}

              {/* MAIN curvilinear shikhara (Nagara style — beehive silhouette) */}
              <path
                d="M 130 158
                   C 130 130, 138 105, 152 85
                   C 165 68, 178 54, 200 38
                   C 222 54, 235 68, 248 85
                   C 262 105, 270 130, 270 158 Z"
                fill="rgba(245,237,224,0.66)"
                stroke="rgba(217,177,95,0.55)"
                strokeWidth="0.6"
              />

              {/* Horizontal tier moldings on shikhara */}
              <line x1="135" y1="142" x2="265" y2="142" stroke="rgba(217,177,95,0.4)" strokeWidth="0.5" />
              <line x1="142" y1="124" x2="258" y2="124" stroke="rgba(217,177,95,0.4)" strokeWidth="0.5" />
              <line x1="152" y1="106" x2="248" y2="106" stroke="rgba(217,177,95,0.4)" strokeWidth="0.5" />
              <line x1="165" y1="88" x2="235" y2="88" stroke="rgba(217,177,95,0.4)" strokeWidth="0.5" />
              <line x1="180" y1="70" x2="220" y2="70" stroke="rgba(217,177,95,0.4)" strokeWidth="0.5" />
              <line x1="190" y1="55" x2="210" y2="55" stroke="rgba(217,177,95,0.4)" strokeWidth="0.5" />

              {/* Vertical ribs (curving with the silhouette) */}
              <path d="M 138 158 Q 156 95 200 38" fill="none" stroke="rgba(217,177,95,0.3)" strokeWidth="0.5" />
              <path d="M 162 158 Q 175 100 200 38" fill="none" stroke="rgba(217,177,95,0.32)" strokeWidth="0.5" />
              <line x1="200" y1="158" x2="200" y2="38" stroke="rgba(217,177,95,0.45)" strokeWidth="0.5" />
              <path d="M 238 158 Q 225 100 200 38" fill="none" stroke="rgba(217,177,95,0.32)" strokeWidth="0.5" />
              <path d="M 262 158 Q 244 95 200 38" fill="none" stroke="rgba(217,177,95,0.3)" strokeWidth="0.5" />

              {/* Decorative niches on shikhara base (with tiny deity figures) */}
              <path d="M 142 156 Q 142 144 152 144 Q 162 144 162 156 L 162 158 L 142 158 Z" fill="rgba(250,199,117,0.42)" stroke="rgba(217,177,95,0.55)" strokeWidth="0.4" />
              <path d="M 238 156 Q 238 144 248 144 Q 258 144 258 156 L 258 158 L 238 158 Z" fill="rgba(250,199,117,0.42)" stroke="rgba(217,177,95,0.55)" strokeWidth="0.4" />
              <circle cx="152" cy="150" r="1" fill="rgba(217,177,95,0.75)" />
              <rect x="150" y="151" width="4" height="6" rx="0.5" fill="rgba(217,177,95,0.55)" />
              <circle cx="248" cy="150" r="1" fill="rgba(217,177,95,0.75)" />
              <rect x="246" y="151" width="4" height="6" rx="0.5" fill="rgba(217,177,95,0.55)" />

              {/* Amalaka (ribbed flat disc atop shikhara) */}
              <ellipse cx="200" cy="36" rx="9" ry="2.4" fill="rgba(217,177,95,0.6)" stroke="rgba(217,177,95,0.85)" strokeWidth="0.5" />
              {[-7, -3.5, 0, 3.5, 7].map((dx, i) => (
                <line key={`am-${i}`} x1={200 + dx} y1="34" x2={200 + dx} y2="38" stroke="rgba(217,177,95,0.85)" strokeWidth="0.4" />
              ))}

              {/* Kalasha (sacred pot with coconut) */}
              <line x1="200" y1="34" x2="200" y2="30" stroke="rgba(217,177,95,0.85)" strokeWidth="0.8" />
              <ellipse cx="200" cy="28" rx="3.6" ry="2.6" fill="rgba(217,177,95,0.95)" />
              <rect x="198" y="24" width="4" height="2" fill="rgba(217,177,95,0.95)" />
              <ellipse cx="200" cy="22" rx="2" ry="1.4" fill="rgba(217,177,95,1)" />
              <line x1="200" y1="20" x2="200" y2="13" stroke="rgba(217,177,95,0.85)" strokeWidth="0.7" />
              <circle cx="200" cy="12" r="1.4" fill="rgba(217,177,95,1)" />

              {/* Dhwajasthamba (temple flag) on top */}
              <line x1="200" y1="12" x2="200" y2="4" stroke="rgba(217,177,95,0.7)" strokeWidth="0.5" />
              <path d="M 200 5 L 215 8 L 200 11 Z" fill="rgba(212,83,126,0.85)" stroke="rgba(153,53,86,0.9)" strokeWidth="0.3" />
              <circle cx="200" cy="3" r="0.8" fill="rgba(217,177,95,1)" />

              {/* Tall pointed entrance (sanctum doorway) */}
              <path
                d="M 178 240 L 178 200 Q 178 168 188 158 L 200 152 L 212 158 Q 222 168 222 200 L 222 240 Z"
                fill="rgba(250,199,117,0.45)"
                stroke="rgba(217,177,95,0.7)"
                strokeWidth="0.8"
              />
              {/* Inner sanctum glow */}
              <ellipse cx="200" cy="218" rx="14" ry="26" fill="rgba(250,199,117,0.6)" />
              <ellipse cx="200" cy="218" rx="20" ry="32" fill="rgba(250,199,117,0.22)" />

              {/* Doorframe carvings */}
              <line x1="178" y1="200" x2="178" y2="240" stroke="rgba(217,177,95,0.6)" strokeWidth="0.8" />
              <line x1="222" y1="200" x2="222" y2="240" stroke="rgba(217,177,95,0.6)" strokeWidth="0.8" />
              {[210, 218, 226, 234].map((dy, i) => (
                <g key={`carv-${i}`}>
                  <circle cx="180" cy={dy} r="0.7" fill="rgba(217,177,95,0.7)" />
                  <circle cx="220" cy={dy} r="0.7" fill="rgba(217,177,95,0.7)" />
                </g>
              ))}

              {/* Toran (mango-leaf + marigold festoon) across doorway */}
              <path d="M 173 162 Q 200 178 227 162" fill="none" stroke="rgba(212,83,126,0.7)" strokeWidth="1" strokeLinecap="round" />
              {[176, 182, 188, 194, 200, 206, 212, 218, 224].map((mx, i) => {
                const my = 162 + Math.sin(((mx - 200) / 27) * Math.PI) * -8 + 6;
                return i % 3 === 0 ? (
                  <g key={`tor2-${i}`}>
                    {[0, 1, 2, 3, 4].map((j) => {
                      const a = ((j * 72 - 90) * Math.PI) / 180;
                      return (
                        <ellipse
                          key={j}
                          cx={mx + Math.cos(a) * 1.6}
                          cy={my + Math.sin(a) * 1.6}
                          rx="1.1"
                          ry="1.8"
                          fill="rgba(250,199,117,0.95)"
                        />
                      );
                    })}
                    <circle cx={mx} cy={my} r="0.9" fill="rgba(212,83,126,0.85)" />
                  </g>
                ) : (
                  <ellipse
                    key={`tor2-${i}`}
                    cx={mx}
                    cy={my + 2}
                    rx="1.6"
                    ry="3.4"
                    fill="rgba(50,130,60,0.78)"
                    stroke="rgba(35,90,40,0.95)"
                    strokeWidth="0.4"
                  />
                );
              })}

              {/* Hanging temple bells flanking entrance */}
              <g>
                <line x1="186" y1="166" x2="186" y2="180" stroke="rgba(217,177,95,0.55)" strokeWidth="0.4" />
                <path d="M 182 180 Q 186 178 190 180 L 190 186 Q 188 188 186 188 Q 184 188 182 186 Z" fill="rgba(217,177,95,0.85)" stroke="rgba(217,177,95,0.95)" strokeWidth="0.3" />
                <circle cx="186" cy="190" r="0.9" fill="rgba(217,177,95,0.95)" />
              </g>
              <g>
                <line x1="214" y1="166" x2="214" y2="180" stroke="rgba(217,177,95,0.55)" strokeWidth="0.4" />
                <path d="M 210 180 Q 214 178 218 180 L 218 186 Q 216 188 214 188 Q 212 188 210 186 Z" fill="rgba(217,177,95,0.85)" stroke="rgba(217,177,95,0.95)" strokeWidth="0.3" />
                <circle cx="214" cy="190" r="0.9" fill="rgba(217,177,95,0.95)" />
              </g>

              {/* Deepa stambha (lamp pillars) flanking entrance */}
              <g>
                <rect x="115" y="220" width="6" height="22" fill="rgba(245,237,224,0.5)" />
                <rect x="113" y="218" width="10" height="3" fill="rgba(245,237,224,0.55)" />
                <rect x="114" y="240" width="8" height="2" fill="rgba(245,237,224,0.6)" />
                <ellipse cx="118" cy="216" rx="4.5" ry="2.2" fill="rgba(217,177,95,0.85)" stroke="rgba(217,177,95,0.95)" strokeWidth="0.3" />
                <ellipse cx="118" cy="212" rx="1" ry="3.2" fill="rgba(250,199,117,1)" />
                <circle cx="118" cy="214" r="6" fill="rgba(250,199,117,0.4)" />
              </g>
              <g>
                <rect x="279" y="220" width="6" height="22" fill="rgba(245,237,224,0.5)" />
                <rect x="277" y="218" width="10" height="3" fill="rgba(245,237,224,0.55)" />
                <rect x="278" y="240" width="8" height="2" fill="rgba(245,237,224,0.6)" />
                <ellipse cx="282" cy="216" rx="4.5" ry="2.2" fill="rgba(217,177,95,0.85)" stroke="rgba(217,177,95,0.95)" strokeWidth="0.3" />
                <ellipse cx="282" cy="212" rx="1" ry="3.2" fill="rgba(250,199,117,1)" />
                <circle cx="282" cy="214" r="6" fill="rgba(250,199,117,0.4)" />
              </g>

              {/* Stepped temple plinth */}
              <rect x="158" y="240" width="84" height="6" fill="rgba(245,237,224,0.4)" />
              <rect x="140" y="246" width="120" height="6" fill="rgba(245,237,224,0.32)" />
              <rect x="118" y="252" width="164" height="8" fill="rgba(245,237,224,0.24)" />

              {/* Diyas on entrance steps */}
              {[148, 178, 222, 252].map((dx, i) => (
                <g key={`diya-${i}`}>
                  <ellipse cx={dx} cy={240} rx="2.2" ry="1" fill="rgba(217,177,95,0.85)" />
                  <ellipse cx={dx} cy={237} rx="0.6" ry="1.6" fill="rgba(250,199,117,1)" />
                  <circle cx={dx} cy={238} r="3" fill="rgba(250,199,117,0.25)" />
                </g>
              ))}

              {/* Lotus motifs at foreground corners */}
              <g transform="translate(40, 268)">
                {[0, 1, 2, 3, 4].map((i) => {
                  const a = (i * 72 - 90) * Math.PI / 180;
                  return (
                    <ellipse
                      key={`l1-${i}`}
                      cx={Math.cos(a) * 4}
                      cy={Math.sin(a) * 4 - 1}
                      rx="2.2"
                      ry="4"
                      fill="rgba(250,199,117,0.55)"
                      transform={`rotate(${i * 72})`}
                    />
                  );
                })}
                <circle cx="0" cy="0" r="1.6" fill="rgba(212,83,126,0.7)" />
              </g>
              <g transform="translate(360, 268)">
                {[0, 1, 2, 3, 4].map((i) => {
                  const a = (i * 72 - 90) * Math.PI / 180;
                  return (
                    <ellipse
                      key={`l2-${i}`}
                      cx={Math.cos(a) * 4}
                      cy={Math.sin(a) * 4 - 1}
                      rx="2.2"
                      ry="4"
                      fill="rgba(250,199,117,0.55)"
                      transform={`rotate(${i * 72})`}
                    />
                  );
                })}
                <circle cx="0" cy="0" r="1.6" fill="rgba(212,83,126,0.7)" />
              </g>

              {/* Rangoli-style floral border at foreground */}
              {[20, 60, 100, 140, 170, 200, 230, 260, 300, 340, 380].map((x, i) => (
                <g key={`f-${i}`}>
                  <circle
                    cx={x}
                    cy={272 + (i % 2) * 4}
                    r="2"
                    fill={i % 3 === 0 ? 'rgba(212,83,126,0.7)' : 'rgba(250,199,117,0.7)'}
                  />
                  {/* Tiny petal accents */}
                  {i % 2 === 0 && (
                    <circle
                      cx={x}
                      cy={272 + (i % 2) * 4}
                      r="0.8"
                      fill="rgba(245,237,224,0.6)"
                    />
                  )}
                </g>
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
