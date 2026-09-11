'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Shared cursor look-at module.
 *
 * Tracks the pointer anywhere on screen (mouse + touch) and exposes
 * spring-smoothed motion values so any figure (hero robot, orbit layer,
 * visor light, …) can turn/lean toward the cursor:
 *
 * - rotateX / rotateY — head-like turn, clamped to ±9° / ±11°
 * - roboX / roboY     — body lean toward the cursor
 * - eyeX / eyeY       — visor light drift (clamped inside the head area)
 * - orbitX / orbitY   — gentle group parallax for floating layers
 *
 * Behaviour: recenters softly after 2.5s idle, exposes a blink flag that
 * fires every 5–8s, and `lookAt` / `releaseLook` let hovered elements steal
 * the gaze. Everything is disabled when `disabled` (reduced motion) is set.
 */
export function useCursorLook({ disabled = false }: { disabled?: boolean } = {}) {
  const reduce = disabled;
  const [blinking, setBlinking] = useState(false);
  const [eyeBright, setEyeBright] = useState(false);
  const hoverLock = useRef(false);
  const idleTimer = useRef<number | null>(null);

  // Pointer in screen space (-0.5..0.5, center = 0).
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const rotateX = useSpring(useTransform(cursorY, [-0.5, 0.5], [9, -9]), { stiffness: 90, damping: 18 });
  const rotateY = useSpring(useTransform(cursorX, [-0.5, 0.5], [-11, 11]), { stiffness: 90, damping: 18 });
  const roboX = useSpring(useTransform(cursorX, [-0.5, 0.5], [-16, 16]), { stiffness: 70, damping: 20 });
  const roboY = useSpring(useTransform(cursorY, [-0.5, 0.5], [-12, 12]), { stiffness: 70, damping: 20 });
  const eyeX = useSpring(useTransform(cursorX, [-0.5, 0.5], [-14, 14]), { stiffness: 170, damping: 17 });
  const eyeY = useSpring(useTransform(cursorY, [-0.5, 0.5], [-9, 9]), { stiffness: 170, damping: 17 });
  const orbitX = useSpring(useTransform(cursorX, [-0.5, 0.5], [-8, 8]), { stiffness: 60, damping: 20 });
  const orbitY = useSpring(useTransform(cursorY, [-0.5, 0.5], [-6, 6]), { stiffness: 60, damping: 20 });

  const scheduleRecenter = useCallback(() => {
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => {
      if (!hoverLock.current && !reduce) {
        animate(cursorX, 0, { type: 'spring', stiffness: 50, damping: 16 });
        animate(cursorY, 0, { type: 'spring', stiffness: 50, damping: 16 });
      }
    }, 2500);
  }, [reduce, cursorX, cursorY]);

  useEffect(() => {
    if (reduce) return;
    const onPoint = (x: number, y: number) => {
      if (hoverLock.current) return;
      cursorX.set(x / window.innerWidth - 0.5);
      cursorY.set(y / window.innerHeight - 0.5);
      scheduleRecenter();
    };
    const onMouse = (e: MouseEvent) => onPoint(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onPoint(t.clientX, t.clientY);
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    scheduleRecenter();
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, [reduce, cursorX, cursorY, scheduleRecenter]);

  // Idle blink every 5–8s.
  useEffect(() => {
    if (reduce) return;
    let alive = true;
    let t1 = 0;
    let t2 = 0;
    const loop = () => {
      t1 = window.setTimeout(() => {
        if (!alive) return;
        setBlinking(true);
        t2 = window.setTimeout(() => {
          if (!alive) return;
          setBlinking(false);
          loop();
        }, 150);
      }, 5000 + Math.random() * 3000);
    };
    loop();
    return () => {
      alive = false;
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduce]);

  /** Point the gaze at a fixed screen-space offset (e.g. a hovered card). */
  const lookAt = useCallback(
    (x: number, y: number) => {
      hoverLock.current = true;
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      if (!reduce) {
        cursorX.set(x);
        cursorY.set(y);
      }
      setEyeBright(true);
    },
    [reduce, cursorX, cursorY]
  );

  /** Release a hover-steered gaze back to the live cursor. */
  const releaseLook = useCallback(() => {
    hoverLock.current = false;
    setEyeBright(false);
    scheduleRecenter();
  }, [scheduleRecenter]);

  return {
    cursorX,
    cursorY,
    rotateX,
    rotateY,
    roboX,
    roboY,
    eyeX,
    eyeY,
    orbitX,
    orbitY,
    blinking,
    eyeBright,
    lookAt,
    releaseLook,
  };
}
