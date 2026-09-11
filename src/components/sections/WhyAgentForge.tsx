'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Container, Section } from '@/components/ui/Container';

const comparisons = [
  {
    feature: 'Sprint planning',
    manual: 'Hours in spreadsheets every cycle',
    automated: 'Generated from your backlog in minutes',
  },
  {
    feature: 'Daily standups',
    manual: 'Another scheduled meeting to run',
    automated: 'Async check-ins, no calendar blocks',
  },
  { feature: 'Meeting notes', manual: 'Notes scattered across docs', automated: 'Summarized with owners assigned' },
  {
    feature: 'Status reports',
    manual: 'Friday scramble for updates',
    automated: 'Drafted and delivered automatically',
  },
  { feature: 'Risk tracking', manual: 'Manually updated, often stale', automated: 'Flagged live before things slip' },
];

export function WhyAgentForge() {
  const reduce = useReducedMotion();

  return (
    <Section id="why" ariaLabelledBy="why-heading" className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="why-heading" className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl font-heading">
            Stop doing these tasks manually
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            The weekly project busywork that quietly eats your team&apos;s focus.
          </p>
        </div>

        <motion.div
          className="card-warm relative mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl glass shadow-card"
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: '-80px' },
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
              })}
        >
          <table className="w-full text-left" aria-label="Manual project management versus AgentForge automation">
            <thead>
              <tr className="border-b border-border-primary bg-bg-secondary/50">
                <th scope="col" className="px-6 py-4 text-sm font-semibold text-text-primary">
                  Task
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-text-muted">
                  Manually
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-brand-primary">
                  With AgentForge
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, index) => (
                <tr
                  key={row.feature}
                  className={`${index !== comparisons.length - 1 ? 'border-b border-border-primary/50' : ''} ${index % 2 === 1 ? 'bg-bg-secondary/50' : ''}`}
                >
                  <th scope="row" className="px-6 py-4 text-sm font-medium text-text-primary">
                    {row.feature}
                  </th>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <X className="h-4 w-4 shrink-0 text-text-muted/50" aria-hidden="true" />
                      <span>{row.manual}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-brand-primary">
                      <Check className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                      <span>{row.automated}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </Container>
    </Section>
  );
}