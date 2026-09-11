import { Bot, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const links = [
  { label: 'Docs', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Contact', href: '#' },
];

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#', label: 'Email' },
];

export function Footer() {
  return (
    <footer className="border-t border-border-primary bg-bg-secondary" role="contentinfo">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start justify-between gap-8 px-6 py-12 sm:flex-row sm:items-center sm:px-8 lg:px-12">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-lg font-bold text-text-primary font-logo">
            <Bot className="h-6 w-6 text-brand-primary" aria-hidden="true" />
            AgentForge
          </div>
          <p className="max-w-xs text-sm text-text-muted">
            The AI project manager that runs sprints, standups, meeting notes, and reports for your team.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 w-full sm:w-auto">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="footer-link text-sm font-medium text-text-muted transition-colors hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="footer-link p-2 rounded-lg text-text-muted hover:text-amber-400 hover:bg-amber-400/10 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border-primary py-5">
        <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-12">
          <p className="text-xs text-text-muted text-center">© {new Date().getFullYear()} AgentForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}