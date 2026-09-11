'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CalendarRange, Megaphone, ClipboardList, Gauge, Sparkles, Zap, Shield, Brain } from 'lucide-react';
import { Container, Section } from '@/components/ui/Container';

const features = [
  {
    icon: CalendarRange,
    title: 'AI Sprint Planning',
    description: 'Plans realistic sprints from your backlog, using team capacity and past velocity.',
  },
  {
    icon: Megaphone,
    title: 'Daily Standups & Follow-ups',
    description: 'Async check-ins through chat, with follow-ups tracked until they are done.',
  },
  {
    icon: ClipboardList,
    title: 'Meeting Notes & Action Items',
    description: 'Meeting notes summarized with action items assigned to the right owner.',
  },
  {
    icon: Gauge,
    title: 'Project Health Dashboard',
    description: 'A live view of progress, blockers, and deadlines across every project.',
  },
];

export function CoreFeatures() {
  const reduce = useReducedMotion();

  return (
    <Section id="features" ariaLabelledBy="features-heading" className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="features-heading" className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl font-heading">
            The AI copilot that runs your project operations
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Sprint planning, standups, meeting notes, and reporting — handled automatically.
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[320px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full robo-halo opacity-60" aria-hidden="true" />
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="card-warm group glass rounded-2xl p-6"
                {...(reduce
                  ? {}
                  : {
                      initial: { opacity: 0, y: 20 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, margin: '-80px' },
                      transition: { duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] as const },
                    })}
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary shadow-glow-blue group-hover:shadow-warm transition-shadow">
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}