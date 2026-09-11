'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Bot, Menu, X, Sun, Moon } from 'lucide-react';
import { LinkButton } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';

const links = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#workforce', label: 'AI Project Team' },
  { href: '#why', label: 'Automation' },
  { href: '#faq', label: 'FAQ' },
];

function ThemeToggleButton({ onToggle, isDark, label }: { onToggle: () => void; isDark: boolean; label: string }) {
  const reduce = useReducedMotion();
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-lg p-2 text-text-muted hover:text-text-primary hover:bg-border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
      onClick={onToggle}
      aria-label={label}
      title={label}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          className="inline-flex"
          {...(reduce
            ? {}
            : {
                initial: { rotate: -90, opacity: 0, scale: 0.6 },
                animate: { rotate: 0, opacity: 1, scale: 1 },
                exit: { rotate: 90, opacity: 0, scale: 0.6 },
                transition: { duration: 0.25, ease: 'easeOut' },
              })}
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-amber-400" aria-hidden="true" />
          ) : (
            <Moon className="h-5 w-5 text-indigo-500" aria-hidden="true" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === 'dark';
  const toggleLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border-primary bg-bg-secondary/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 sm:px-8 lg:px-12" />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-primary bg-bg-secondary/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-text-primary font-logo" aria-label="AgentForge home">
          <Bot className="h-6 w-6 text-brand-primary" aria-hidden="true" />
          AgentForge
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggleButton onToggle={toggleTheme} isDark={isDark} label={toggleLabel} />
          <LinkButton href="http://localhost:5173" size="sm">
            Get Started
          </LinkButton>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-text-muted hover:text-text-primary hover:bg-border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="border-t border-border-primary bg-bg-secondary/95 px-6 pb-6 pt-2 backdrop-blur-xl md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-text-muted hover:text-text-primary hover:bg-border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between gap-3">
            <LinkButton href="http://localhost:5173" className="w-full" onClick={() => setOpen(false)}>
              Get Started
            </LinkButton>
            <ThemeToggleButton onToggle={toggleTheme} isDark={isDark} label={toggleLabel} />
          </div>
        </nav>
      )}
    </header>
  );
}
