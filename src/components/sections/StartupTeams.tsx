'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Rocket, Kanban, Code2, Globe } from 'lucide-react';
import { Container, Section } from '@/components/ui/Container';

const teams = [
  {
    icon: Rocket,
    name: 'Founders',
    description: 'See project progress and risk without digging through tools yourself.',
  },
  {
    icon: Kanban,
    name: 'Project Managers',
    description: 'Offload the weekly busywork and focus on coordination that matters.',
  },
  {
    icon: Code2,
    name: 'Developers',
    description: 'Spend less time in status meetings, more time shipping.',
  },
  {
    icon: Globe,
    name: 'Remote Teams',
    description: 'Stay aligned across time zones with async updates and shared context.',
  },
];

export function StartupTeams() {
  const reduce = useReducedMotion();

  return (
    <Section id="teams" ariaLabelledBy="teams-heading" className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="teams-heading" className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl font-heading">
            Built for startup teams
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            From first sprint to scale — sized for the way lean teams actually work.
          </p>
        </div>

        <div className="relative mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[280px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full robo-halo opacity-50" aria-hidden="true" />
          {teams.map((team, index) => {
            const Icon = team.icon;
            return (
              <motion.div
                key={team.name}
                className="card-warm glass rounded-2xl p-6"
                {...(reduce
                  ? {}
                  : {
                      initial: { opacity: 0, y: 20 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, margin: '-80px' },
                      transition: { duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] as const },
                    })}
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary shadow-glow-blue">
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">{team.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{team.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}