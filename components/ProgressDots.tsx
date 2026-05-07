'use client';

import { useEffect, useState } from 'react';

const sections = ['Open', 'Match', 'Story', 'Journey', 'Day 1', 'Day 2', 'RSVP'];

export default function ProgressDots() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    function onScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / total;
      setActive(Math.min(sections.length - 1, Math.floor(progress * sections.length)));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {sections.map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-2 group"
          aria-label={s}
        >
          <span
            className={`text-[10px] tracking-wider transition-opacity hidden sm:inline ${
              active === i ? 'opacity-70' : 'opacity-0 group-hover:opacity-50'
            }`}
            style={{
              color: active >= 4 ? '#f5ede0' : '#f5ede0',
            }}
          >
            {s}
          </span>
          <div
            className={`rounded-full transition-all ${
              active === i ? 'w-2 h-2 bg-cream' : 'w-1 h-1 bg-cream/30'
            }`}
          />
        </div>
      ))}
    </div>
  );
}
