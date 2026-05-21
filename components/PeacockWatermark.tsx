'use client';

import { motion } from 'framer-motion';
import PeacockFeather from './PeacockFeather';

// Krishna's presence across every scene — a single feather tucked in the
// top-left corner, swaying gently. Subtle by design.
export default function PeacockWatermark() {
  return (
    <motion.div
      className="fixed top-2 left-2 sm:top-4 sm:left-4 z-40 pointer-events-none"
      style={{ transformOrigin: 'bottom center' }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 0.58,
        rotate: [-5, 5, -5],
      }}
      transition={{
        opacity: { duration: 1.6, ease: 'easeOut' },
        rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <PeacockFeather size={22} />
    </motion.div>
  );
}
