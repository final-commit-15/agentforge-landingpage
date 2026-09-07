'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bot, Menu, X } from 'lucide-react';
import { LinkButton } from '@/components/ui/Button';

const links = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#workforce', label: 'AI Project Team' },
  { href: '#why', label: 'Automation' },
  { href: '#faq', label: 'FAQ' },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink/5 bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-ink" aria-label="AgentForge home">
          <Bot className="h-6 w-6 text-primary" aria-hidden="true" />
          AgentForge
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <LinkButton href="https://agentforge-main.vercel.app/login" size="sm">
            Get Started
          </LinkButton>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-ink/70 hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
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
          className="border-t border-ink/5 bg-surface/95 px-6 pb-6 pt-2 backdrop-blur-xl md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-ink/80 hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <LinkButton href="https://agentforge-main.vercel.app/login" className="w-full" onClick={() => setOpen(false)}>
              Get Started
            </LinkButton>
          </div>
        </nav>
      )}
    </header>
  );
}
