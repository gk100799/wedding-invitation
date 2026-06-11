'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper as PhotoSwiper, SwiperSlide as PhotoSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { story, basePath } from '@/lib/data';

export default function StoryGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState(story);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setItems(
      params.has('madhu1')
        ? story.filter(item => item.caption !== 'the engagement')
        : story,
    );
  }, []);

  return (
    <section ref={ref} className="scene bg-[#14100c] text-cream flex flex-col pt-12 sm:pt-16 pb-10 sm:pb-14">
      <div className="px-6 max-w-2xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-[10px] tracking-[0.3em] text-cream/50 mb-1.5"
        >
          OUR STORY
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          viewport={{ once: true }}
          className="font-display italic text-[clamp(1.2rem,4.8vw,1.7rem)] leading-[1.1] mb-3 sm:mb-5"
        >
          two strangers,<br />a few coffees,<br />some chaos.
        </motion.h2>
      </div>

      {/* Horizontal sub-Swiper, auto-advances so users see both photos without
          having to know they can swipe. nested:true tells the outer vertical
          Swiper to let this own horizontal touches; vertical swipes still
          navigate between sections. */}
      <PhotoSwiper
        nested
        loop
        autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay, EffectFade]}
        className="story-swiper flex-1 min-h-0 w-full mt-4 sm:mt-6"
        slidesPerView={1}
      >
        {items.map((item, i) => (
          <PhotoSlide key={i} className="!flex items-center justify-center px-6">
            <Polaroid item={item} index={i} />
          </PhotoSlide>
        ))}
      </PhotoSwiper>
    </section>
  );
}

function Polaroid({
  item,
  index,
}: {
  item: { src: string; caption: string; date: string; orientation?: 'portrait' | 'landscape' };
  index: number;
}) {
  const isEven = index % 2 === 0;
  const isLandscape = item.orientation === 'landscape';
  const aspectClass = isLandscape ? 'aspect-[5/4]' : 'aspect-[4/5]';
  const widthClass = isLandscape
    ? 'max-w-[300px] sm:max-w-[420px]'
    : 'max-w-[240px] sm:max-w-[320px]';
  const tapeRotate = isEven ? -7 : 6;
  const tilt = isEven ? -2 : 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: tilt + (isEven ? -4 : 4) }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: false, amount: 0.3 }}
      className={`relative bg-cream p-3 sm:p-4 w-full ${widthClass} shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]`}
    >
      {/* Decorative tape */}
      <div
        className="absolute -top-2.5 left-1/2 w-14 sm:w-16 h-5 bg-gold/55 backdrop-blur-sm border border-gold/40 shadow-md"
        style={{ transform: `translateX(-50%) rotate(${tapeRotate}deg)` }}
      />

      <div className={`relative ${aspectClass} mb-3 overflow-hidden bg-rose/10`}>
        <Image
          src={`${basePath}${item.src}`}
          alt={item.caption}
          fill
          sizes={
            isLandscape
              ? '(max-width: 640px) 300px, 420px'
              : '(max-width: 640px) 240px, 320px'
          }
          className="object-cover"
          priority={index === 0}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.25)' }}
        />
      </div>
      <div className="px-1">
        <p className="font-display italic text-ink text-base sm:text-lg leading-tight">
          {item.caption}
        </p>
        <p className="text-ink/50 text-[10px] tracking-[0.18em] uppercase mt-1">
          {item.date}
        </p>
      </div>
    </motion.div>
  );
}
