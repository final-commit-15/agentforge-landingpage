import { Sparkles } from 'lucide-react';

const technologies = ['OpenAI', 'Ollama', 'Slack', 'GitHub', 'Jira', 'Notion', 'Google Calendar'];

export function TechStrip() {
  return (
    <section aria-label="Integrations and tools" className="border-y border-border-primary bg-bg-secondary/50 py-10">
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-12">
        <p className="flex items-center justify-center gap-2 text-center text-sm font-medium text-text-muted">
          <Sparkles className="h-4 w-4 text-brand-primary" aria-hidden="true" />
          Works with the tools your team already uses.
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4" aria-label="Integrations">
          {technologies.map((tech) => (
            <li
              key={tech}
              className="text-base font-semibold tracking-tight text-text-muted transition-all hover:text-amber-500 dark:hover:text-amber-300 hover:drop-shadow-[0_0_12px_rgba(255,245,230,0.5)]"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}