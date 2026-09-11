'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Container, Section } from '@/components/ui/Container';

const faqs = [
  {
    question: 'How does AgentForge fit into our existing tools?',
    answer:
      'AgentForge connects to the tools you already use — Slack, Jira, GitHub, Notion, and Google Calendar — so there is no new workflow to learn.',
  },
  {
    question: 'Will it replace our project manager or PM tools?',
    answer:
      'No. It automates the repetitive work around them — standups, notes, reminders, and reports — so your PMs can focus on decisions, not logistics.',
  },
  {
    question: 'Is this built for small startup teams?',
    answer:
      'Yes. It is designed for lean teams that need clarity without the overhead of heavyweight enterprise project management suites.',
  },
  {
    question: 'What does AgentForge automate first?',
    answer:
      'It starts with sprint planning, daily standups, meeting notes, and status reports — the busywork that consumes hours every week.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section id="faq" ariaLabelledBy="faq-heading" className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="faq-heading" className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl font-heading">
            Frequently asked questions
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-2xl space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={faq.question} className="card-warm overflow-hidden glass rounded-xl">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="text-base font-semibold text-text-primary">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-text-muted"
                    aria-hidden="true"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={reduce ? undefined : { height: 'auto', opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-text-muted">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}