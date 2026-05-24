'use client';

import { basePath } from '@/lib/data';

// Real peacock feather (mor-pankh) — from openclipart.org, public domain.
// The SVG is square (7693×7692 viewBox) with the feather oriented diagonally,
// which gives it a natural, tumbling quality when animated.
export default function PeacockFeather({ size = 80 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${basePath}/images/peacock-feather-real.svg`}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      style={{
        objectFit: 'contain',
        display: 'block',
        // Rotate so the feather hangs tip-up, eye near the top — natural falling posture.
        transform: 'rotate(-42deg)',
        // Boost the iridescent blues and greens; brighten slightly so it reads on dark bg.
        filter: 'saturate(0.75) brightness(0.95) opacity(0.82) drop-shadow(0 0 4px rgba(30,58,138,0.3))',
      }}
    />
  );
}
