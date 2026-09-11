'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

const GLOW_SIZE = 520;

/**
 * Night-mode cursor aura.
 *
 * A soft warm spotlight that trails the pointer in dark mode only —
 * like lamplight following the cursor through a dark room. Purely
 * decorative: pointer-events-none, screen blend, hidden on touch-only
 * devices and whenever reduced motion is requested. Fades smoothly
 * in/out with the theme switch.
 */
export function CursorGlow() {
  const { theme, mounted } = useTheme();
  const reduce = useReducedMotion();
  const [finePointer, setFinePointer] = useState(true);

  const x = useMotionValue(-GLOW_SIZE);
  const y = useMotionValue(-GLOW_SIZE);
  const glowX = useSpring(x, { stiffness: 130, damping: 22, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 130, damping: 22, mass: 0.6 });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
        setFinePointer(window.matchMedia('(pointer: fine)').matches);
      }
    } catch {
      /* default to showing the glow */
    }
  }, []);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - GLOW_SIZE / 2);
      y.set(e.clientY - GLOW_SIZE / 2);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduce, x, y]);

  if (!mounted || reduce || !finePointer) return null;

  return (
    <motion.div
      aria-hidden="true"
      data-testid="cursor-glow"
      className="cursor-glow"
      style={{ x: glowX, y: glowY }}
      initial={false}
      animate={{ opacity: theme === 'dark' ? 1 : 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    />
  );
}
