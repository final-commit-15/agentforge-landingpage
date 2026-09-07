'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Slack, Github, NotepadText, CalendarDays, MessageSquare, Sparkles } from 'lucide-react';
import { LinkButton, DemoIcon } from '@/components/ui/Button';

const badges = [
  { icon: Slack, label: 'Slack', className: 'top-[16%] -right-3 sm:-right-6' },
  { icon: Github, label: 'GitHub', className: 'top-[44%] -left-3 sm:-left-8' },
  { icon: NotepadText, label: 'Jira', className: 'bottom-[30%] -right-2 sm:-right-5' },
  { icon: CalendarDays, label: 'Notion', className: 'bottom-[12%] -left-2 sm:-left-6' },
  { icon: MessageSquare, label: 'Calendar', className: 'top-[30%] -right-6 sm:-right-10' },
];

export function Hero() {
  const reduce = useReducedMotion();

  const fadeUp = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full bg-blue-200/40 blur-[120px]" />
        <div className="absolute top-1/3 -right-24 h-[380px] w-[380px] rounded-full bg-accent/20 blur-[110px]" />
      </div>

      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-6 pb-16 pt-16 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pb-24 lg:pt-20">
        <motion.div className="lg:col-span-6" {...fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Now accepting early access
          </span>

          <h1
            id="hero-heading"
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]"
          >
            Your AI Project Manager
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Never Misses a Deadline.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            Automate sprint planning, standups, meeting notes, reminders, reports, and project tracking with AI.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <LinkButton href="https://agentforge-main.vercel.app/login" size="lg">
              Get Started
            </LinkButton>
            <LinkButton href="#demo" variant="demo" size="lg" icon={DemoIcon}>
              Watch Demo
            </LinkButton>
          </div>
        </motion.div>

        <div className="relative lg:col-span-6">
          <div className="relative mx-auto w-full max-w-[520px]">
            <div
              className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/15 to-accent/15 blur-[90px]"
              aria-hidden="true"
            />
            <video
              src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_robo_video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-24 border border-ink/5 object-cover shadow-card"
              aria-label="AgentForge project management demonstration"
              poster="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_robo_poster.jpg"
            />

            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className={`absolute hidden items-center gap-1.5 rounded-full border border-ink/5 bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink shadow-soft backdrop-blur-md animate-float-slow sm:flex ${badge.className}`}
                >
                  <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  {badge.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
