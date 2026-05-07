'use client';

// Native CSS scroll-snap is now used (see globals.css). Lenis is disabled because
// it intercepts scroll events and prevents browser snap from triggering.

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
