'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { LinkButton } from '@/components/ui/Button';

export function FinalCTA() {
  const reduce = useReducedMotion();

  return (
    <section id="get-started" aria-labelledby="cta-heading" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full robo-halo animate-glow-pulse" />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-12">
        <motion.div
          className="card-warm glass mx-auto max-w-2xl rounded-3xl px-8 py-12 text-center"
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: '-80px' },
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
              })}
        >
          <h2 id="cta-heading" className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl font-heading">
            Let AI handle project management busywork
          </h2>
          <p className="mt-4 text-lg text-text-muted">Get started now and put your weekly PM admin on autopilot.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <LinkButton href="http://localhost:5173" size="lg" className="group relative overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-400/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
            </LinkButton>
            <LinkButton href="#demo" variant="secondary" size="lg">
              Watch Demo
            </LinkButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}