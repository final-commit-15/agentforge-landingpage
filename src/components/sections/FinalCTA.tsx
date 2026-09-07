'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { LinkButton } from '@/components/ui/Button';

export function FinalCTA() {
  const reduce = useReducedMotion();

  return (
    <section id="get-started" aria-labelledby="cta-heading" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/15 to-accent/15 blur-[110px]" />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-12">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: '-80px' },
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
              })}
        >
          <h2 id="cta-heading" className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Let AI handle project management busywork
          </h2>
          <p className="mt-4 text-lg text-ink/60">Get started now and put your weekly PM admin on autopilot.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <LinkButton href="https://agentforge-main.vercel.app/login" size="lg">
              Get Started
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
