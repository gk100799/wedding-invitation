'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { story, basePath } from '@/lib/data';

export default function StoryGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={ref} className="scene bg-[#14100c] text-cream flex flex-col justify-center py-8 sm:py-12">
      <div className="px-6 max-w-2xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-[10px] tracking-[0.3em] text-cream/50 mb-2"
        >
          OUR STORY
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          viewport={{ once: true }}
          className="font-display italic text-[clamp(1.4rem,5.5vw,2rem)] leading-[1.1] mb-5 sm:mb-7"
        >
          two strangers,<br />a few coffees,<br />some chaos.
        </motion.h2>
      </div>

      <div className="flex flex-col gap-5 sm:gap-7 px-4 sm:px-12 max-w-3xl mx-auto w-full">
        {story.map((item, i) => (
          <Polaroid
            key={i}
            item={item}
            scrollYProgress={scrollYProgress}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

function Polaroid({
  item,
  scrollYProgress,
  index,
}: {
  item: { src: string; caption: string; date: string; orientation?: 'portrait' | 'landscape' };
  scrollYProgress: any;
  index: number;
}) {
  const isEven = index % 2 === 0;
  const rotation = useTransform(
    scrollYProgress,
    [0, 1],
    [isEven ? -3 : 3, isEven ? 1.5 : -1.5]
  );

  const isLandscape = item.orientation === 'landscape';
  const aspectClass = isLandscape ? 'aspect-[5/4]' : 'aspect-[4/5]';
  const widthClass = isLandscape
    ? 'max-w-[260px] sm:max-w-[340px]'
    : 'max-w-[200px] sm:max-w-[260px]';
  const alignClass = isEven
    ? 'self-center sm:self-start'
    : 'self-center sm:self-end';

  const tapeRotate = isEven ? -8 : 7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotateX: -22, rotateY: isEven ? -10 : 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.3 }}
      style={{ rotate: rotation, transformStyle: 'preserve-3d', perspective: 1200 }}
      className={`relative bg-cream p-3 sm:p-4 w-full ${widthClass} ${alignClass} shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)]`}
    >
      {/* Decorative tape */}
      <div
        className="absolute -top-2.5 left-1/2 w-16 h-5 bg-gold/55 backdrop-blur-sm border border-gold/40 shadow-md"
        style={{ transform: `translateX(-50%) rotate(${tapeRotate}deg)` }}
      />

      <div className={`relative ${aspectClass} mb-3 overflow-hidden bg-rose/10`}>
        <Image
          src={`${basePath}${item.src}`}
          alt={item.caption}
          fill
          sizes={isLandscape ? '(max-width: 640px) 320px, 400px' : '(max-width: 640px) 260px, 320px'}
          className="object-cover"
          priority={index === 0}
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.25)' }} />
      </div>
      <div className="px-1">
        <p className="font-display italic text-ink text-base sm:text-lg leading-tight">{item.caption}</p>
        <p className="text-ink/50 text-[10px] tracking-[0.18em] uppercase mt-1">{item.date}</p>
      </div>
    </motion.div>
  );
}
