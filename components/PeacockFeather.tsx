'use client';

// A natural-looking peacock feather (mor-pankh) — long slender silhouette,
// barbs running the full length of the shaft, and an ocellus with the real
// colour stack: bronze halo → emerald ring → cobalt → dark crescent.

const VB_W = 80;
const VB_H = 320;
const SHAFT_X = 40;
const EYE_CY = 64;

// Barbs run from just above the eye down to the tip of the shaft. They
// angle upward (toward the eye), longest in the middle of the feather and
// tapering at both ends — same as a real plume.
const BARBS = (() => {
  const arr: { y: number; len: number; angleDeg: number; opacity: number; width: number }[] = [];
  const count = 46;
  const top = 28; // just above the eye centre
  const bottom = 308;
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1); // 0 at top, 1 at bottom
    const y = top + t * (bottom - top);
    // Length: short near the eye, longest just below it, tapering toward the tip.
    const lengthCurve = Math.sin(Math.min(1, t * 1.25) * Math.PI * 0.85);
    const len = 5 + lengthCurve * 26;
    // Angle from the vertical shaft — barbs angle UP toward the eye.
    // Steeper (more horizontal) near the eye, flatter (closer to vertical) near the tip.
    const angleDeg = 78 - t * 38; // 78° → 40°
    const opacity = 0.32 + (1 - t) * 0.45;
    const width = 0.55 + (1 - Math.abs(t - 0.35)) * 0.25;
    arr.push({ y, len, angleDeg, opacity, width });
  }
  return arr;
})();

export default function PeacockFeather({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={(size * VB_H) / VB_W}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      fill="none"
    >
      <defs>
        {/* Bronze/gold halo — the outermost ring of the ocellus. */}
        <radialGradient id="pfHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e6c178" stopOpacity="0" />
          <stop offset="55%" stopColor="#caa14a" stopOpacity="0.55" />
          <stop offset="85%" stopColor="#8a5e22" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3a2810" stopOpacity="0" />
        </radialGradient>
        {/* Emerald ring — the green band that catches the eye in real feathers. */}
        <radialGradient id="pfGreen" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5fa676" stopOpacity="0" />
          <stop offset="60%" stopColor="#3a8460" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#1d4a36" stopOpacity="0.85" />
        </radialGradient>
        {/* Cobalt body — the bright blue main mass of the eye. */}
        <radialGradient id="pfCobalt" cx="48%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#5b8fd1" stopOpacity="1" />
          <stop offset="60%" stopColor="#1f3f86" stopOpacity="1" />
          <stop offset="100%" stopColor="#0c1f4a" stopOpacity="1" />
        </radialGradient>
        {/* Barb stroke — iridescent teal-green along its length. */}
        <linearGradient id="pfBarb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1f4a4a" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#2b6e8a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#3a8460" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Shaft (rachis) — pale, tapering, visible only through the gaps. */}
      <path
        d={`M${SHAFT_X} ${VB_H - 2} Q${SHAFT_X} ${VB_H * 0.5} ${SHAFT_X} ${EYE_CY + 8}`}
        stroke="#caa14a"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Barbs — mirrored pairs angled UPWARD toward the eye. */}
      {BARBS.map((b, i) => {
        const rad = (b.angleDeg * Math.PI) / 180;
        const dx = Math.sin(rad) * b.len;
        const dy = -Math.cos(rad) * b.len; // negative = upward
        return (
          <g key={i} opacity={b.opacity}>
            <line
              x1={SHAFT_X}
              y1={b.y}
              x2={SHAFT_X + dx}
              y2={b.y + dy}
              stroke="url(#pfBarb)"
              strokeWidth={b.width}
              strokeLinecap="round"
            />
            <line
              x1={SHAFT_X}
              y1={b.y}
              x2={SHAFT_X - dx}
              y2={b.y + dy}
              stroke="url(#pfBarb)"
              strokeWidth={b.width}
              strokeLinecap="round"
            />
          </g>
        );
      })}

      {/* Short downy plume just behind the eye — finer, paler strokes. */}
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (-90 + (i / 17) * 180) * (Math.PI / 180); // -90° to 90°
        const len = 14 + Math.sin((i / 17) * Math.PI) * 8;
        const x2 = SHAFT_X + Math.cos(angle) * len;
        const y2 = EYE_CY + Math.sin(angle) * len * 0.7 - 10;
        return (
          <line
            key={`d-${i}`}
            x1={SHAFT_X}
            y1={EYE_CY + 4}
            x2={x2}
            y2={y2}
            stroke="#2b6e8a"
            strokeWidth="0.45"
            strokeLinecap="round"
            opacity="0.45"
          />
        );
      })}

      {/* Ocellus — natural-feather colour stack, outside → inside. */}
      {/* Bronze halo, asymmetric teardrop (wider at top). */}
      <ellipse cx={SHAFT_X} cy={EYE_CY - 2} rx="22" ry="32" fill="url(#pfHalo)" />
      {/* Emerald ring. */}
      <ellipse cx={SHAFT_X} cy={EYE_CY - 1} rx="15" ry="22" fill="url(#pfGreen)" />
      {/* Thin gold accent rim — what gives mor-pankh its glow. */}
      <ellipse
        cx={SHAFT_X}
        cy={EYE_CY - 1}
        rx="12"
        ry="18"
        fill="none"
        stroke="#d9b15f"
        strokeWidth="0.6"
        opacity="0.55"
      />
      {/* Cobalt body. */}
      <ellipse cx={SHAFT_X} cy={EYE_CY} rx="9.5" ry="14" fill="url(#pfCobalt)" />
      {/* Dark crescent — the heart-shaped inner mark of a real peacock eye. */}
      <path
        d={`M${SHAFT_X} ${EYE_CY - 9}
            C${SHAFT_X - 7} ${EYE_CY - 6}, ${SHAFT_X - 6} ${EYE_CY + 4}, ${SHAFT_X} ${EYE_CY + 7}
            C${SHAFT_X + 6} ${EYE_CY + 4}, ${SHAFT_X + 7} ${EYE_CY - 6}, ${SHAFT_X} ${EYE_CY - 9} Z`}
        fill="#070d22"
        opacity="0.95"
      />
      {/* Specular highlight — tiny offset gleam. */}
      <ellipse cx={SHAFT_X - 2.4} cy={EYE_CY - 3} rx="1.4" ry="2.2" fill="#a8c8e0" opacity="0.7" />
    </svg>
  );
}
