'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Plug, Zap, BellRing } from 'lucide-react';
import { Container, Section } from '@/components/ui/Container';
import { AICommandCenter } from '@/components/sections/AICommandCenter';

const steps = [
  {
    icon: Plug,
    title: 'Connect Workspace',
    description: 'Link Slack, Jira, GitHub, Notion, and Google Calendar in a few clicks.',
  },
  {
    icon: Zap,
    title: 'Let AgentForge Run Repetitive PM Tasks',
    description: 'Sprints planned, standups scheduled, notes drafted — all automatically.',
  },
  {
    icon: BellRing,
    title: 'Stay Updated Automatically',
    description: 'Reminders, reports, and status updates delivered where your team already works.',
  },
];

export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <Section id="how-it-works" ariaLabelledBy="how-heading" className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="how-heading" className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl font-heading">
            From busywork to automation in three steps
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Connect your workspace, and AgentForge takes over the repetitive stuff.
          </p>
        </div>

        <ol className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.title}
                className="flex flex-col items-start"
                {...(reduce
                  ? {}
                  : {
                      initial: { opacity: 0, y: 20 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, margin: '-80px' },
                      transition: { duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as const },
                    })}
              >
                <div className="mb-4 inline-flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary/20 transition-colors">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold tracking-wide text-brand-primary/70">Step {index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.description}</p>
              </motion.li>
            );
          })}
        </ol>
      </Container>

      <AICommandCenter />
    </Section>
  );
}
