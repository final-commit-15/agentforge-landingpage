'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Brain,
  Layers,
  GitPullRequest,
  CheckCircle2,
  FileUp,
  ListChecks,
  UserCheck,
  Rocket,
  ChevronDown,
  Inbox,
  Radio,
} from 'lucide-react';
import { Container, Section } from '@/components/ui/Container';

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type AgentTone = 'warm' | 'amber' | 'sky' | 'green';

interface Agent {
  id: string;
  icon: typeof Brain;
  name: string;
  status: string;
  tone: AgentTone;
  outputs: { value: string; label: string }[];
  progress: number;
  progressLabel: string;
  extra: 'coverage' | 'timeline' | 'commits' | 'checks';
}

const agents: Agent[] = [
  {
    id: 'analyst',
    icon: Brain,
    name: 'Requirements Analyst',
    status: 'Active',
    tone: 'warm',
    outputs: [
      { value: '12', label: 'Requirements Extracted' },
      { value: '8', label: 'User Stories Created' },
      { value: '96%', label: 'Requirement Coverage' },
    ],
    progress: 96,
    progressLabel: '96% requirement coverage',
    extra: 'coverage',
  },
  {
    id: 'planner',
    icon: Layers,
    name: 'Feature Planner',
    status: 'Running',
    tone: 'amber',
    outputs: [
      { value: '24', label: 'Features Planned' },
      { value: '62', label: 'Tasks Generated' },
      { value: 'Ready', label: 'Sprint Status' },
    ],
    progress: 78,
    progressLabel: '78% of sprint planned',
    extra: 'timeline',
  },
  {
    id: 'review',
    icon: GitPullRequest,
    name: 'GitHub Review Agent',
    status: 'Monitoring Repository',
    tone: 'sky',
    outputs: [
      { value: '6', label: 'PRs Reviewed' },
      { value: '2', label: 'Needs Changes' },
      { value: '4', label: 'Approved' },
    ],
    progress: 67,
    progressLabel: '4 of 6 PRs approved',
    extra: 'commits',
  },
  {
    id: 'qa',
    icon: CheckCircle2,
    name: 'QA Verification Agent',
    status: 'Testing',
    tone: 'green',
    outputs: [
      { value: 'Passed', label: 'UI Tests' },
      { value: 'Passed', label: 'API Tests' },
      { value: '98%', label: 'Accessibility Score' },
    ],
    progress: 98,
    progressLabel: '98% accessibility score',
    extra: 'checks',
  },
];

const toneDot: Record<AgentTone, string> = {
  warm: 'bg-amber-200',
  amber: 'bg-amber-400',
  sky: 'bg-sky-400',
  green: 'bg-emerald-400',
};

const tonePing: Record<AgentTone, string> = {
  warm: 'bg-amber-200/60',
  amber: 'bg-amber-400/60',
  sky: 'bg-sky-400/60',
  green: 'bg-emerald-400/60',
};

interface WorkflowNode {
  icon: typeof Brain;
  label: string;
  role: string;
  state: 'done' | 'active' | 'todo';
}

const workflow: WorkflowNode[] = [
  { icon: FileUp, label: 'Client Requirements', role: 'Raw briefs, docs and tickets are ingested as the single source of truth.', state: 'done' },
  { icon: Brain, label: 'Requirements Analyst', role: 'Extracts testable requirements and drafts user stories with acceptance criteria.', state: 'done' },
  { icon: Layers, label: 'Feature Planner', role: 'Groups stories into shippable features and sequences them by value and risk.', state: 'done' },
  { icon: ListChecks, label: 'Task Breakdown', role: 'Splits features into right-sized engineering tasks with estimates.', state: 'done' },
  { icon: UserCheck, label: 'Task Assignment', role: 'Matches tasks to agent capacity and opens the sprint — live right now.', state: 'active' },
  { icon: GitPullRequest, label: 'GitHub Review', role: 'Reviews every pull request for correctness, style and test coverage.', state: 'todo' },
  { icon: CheckCircle2, label: 'QA Verification', role: 'Runs UI, API and accessibility suites and blocks regressions.', state: 'todo' },
  { icon: Rocket, label: 'Deployment Ready', role: 'Produces release notes and a verified, deployable build.', state: 'todo' },
];

const activityFeed = [
  { text: 'Requirements uploaded', time: 'just now', tone: 'bg-amber-200' },
  { text: 'AI generated 8 features', time: '2m ago', tone: 'bg-indigo-400' },
  { text: 'Sprint #12 created', time: '9m ago', tone: 'bg-sky-400' },
  { text: 'PR #42 reviewed', time: '18m ago', tone: 'bg-violet-400' },
  { text: 'QA checklist generated', time: '26m ago', tone: 'bg-emerald-400' },
  { text: 'Documentation updated', time: '34m ago', tone: 'bg-slate-400' },
];

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function StatusDot({ tone, label }: { tone: AgentTone; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5" aria-label={label} role="status">
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${tonePing[tone]}`} aria-hidden="true" />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${toneDot[tone]}`} aria-hidden="true" />
      </span>
    </span>
  );
}

function PlanningTimeline() {
  const steps = ['Scope', 'Slice', 'Estimate', 'Commit'];
  return (
    <div className="mt-4" aria-hidden="true">
      <div className="flex items-center gap-1.5">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-1.5 last:flex-none">
            <motion.span
              className={`h-1.5 flex-1 rounded-full ${i < 3 ? 'bg-gradient-to-r from-amber-500 to-amber-300 dark:from-amber-300 dark:to-amber-100' : 'bg-border-primary'}`}
              initial={{ opacity: 0.2 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.25, duration: 0.5 }}
            />
            {i < steps.length - 1 && <span className={`h-1 w-1 rounded-full ${i < 2 ? 'bg-amber-400' : 'bg-border-secondary'}`} />}
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] font-medium text-text-muted">
        {steps.map((s, i) => (
          <span key={s} className={i < 3 ? 'text-text-secondary' : undefined}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function RepoActivity() {
  const commits = [90, 60, 75, 45, 100, 55, 80, 65, 95, 50, 70, 85];
  return (
    <div className="mt-4" aria-hidden="true">
      <div className="flex items-end gap-1" aria-label="Repository commit activity">
        {commits.map((h, i) => (
          <motion.span
            key={i}
            className={`w-full rounded-sm ${i === 4 ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]' : 'bg-brand-primary/50'}`}
            style={{ height: `${Math.max(6, (h / 100) * 28)}px` }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center gap-3 text-[10px] font-medium">
        <span className="inline-flex items-center gap-1 text-emerald-500 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />4 approved
        </span>
        <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />2 needs changes
        </span>
      </div>
    </div>
  );
}

function SprintRing() {
  const reduce = useReducedMotion();
  const size = 132;
  const stroke = 11;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = 78;
  return (
    <div className="flex items-center gap-5">
      <div className="relative shrink-0" role="img" aria-label="Sprint Alpha is 78 percent complete">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border-primary)" strokeWidth={stroke} />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="url(#sprintGrad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            initial={reduce ? { strokeDashoffset: c - (c * pct) / 100 } : { strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c - (c * pct) / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: 'drop-shadow(0 0 6px rgba(255,245,230,0.55))' }}
          />
          <defs>
            <linearGradient id="sprintGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fcd34d" />
              <stop offset="55%" stopColor="#fff5e6" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="stat-accent text-2xl font-extrabold font-heading">78%</span>
          <span className="text-[10px] font-medium text-text-muted">Complete</span>
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-text-primary font-heading">Sprint Alpha</p>
        <dl className="mt-2 space-y-1.5 text-xs">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-text-muted">Story Points</dt>
            <dd className="font-semibold text-text-primary">89 / 120</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-text-muted">Open Blockers</dt>
            <dd className="font-semibold text-amber-600 dark:text-amber-300">3</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-text-muted">Pending Reviews</dt>
            <dd className="font-semibold text-text-primary">2</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function CommandCenterSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl glass" aria-label="Loading AI Command Center" role="status">
      <div className="border-b border-border-primary px-5 py-3">
        <div className="animate-shimmer h-4 w-56 rounded-full" />
      </div>
      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl glass p-5">
            <div className="animate-shimmer h-10 w-10 rounded-xl" />
            <div className="animate-shimmer mt-4 h-4 w-3/4 rounded-full" />
            <div className="animate-shimmer mt-2 h-3 w-1/2 rounded-full" />
            <div className="animate-shimmer mt-4 h-2 w-full rounded-full" />
          </div>
        ))}
      </div>
      <div className="px-5 pb-5">
        <div className="animate-shimmer h-28 w-full rounded-2xl" />
      </div>
    </div>
  );
}

function EmptyWorkspace() {
  return (
    <div className="flex flex-col items-center rounded-3xl glass px-6 py-16 text-center" role="status">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-border-secondary text-text-muted">
        <Inbox className="h-7 w-7" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-bold text-text-primary font-heading">No workspace connected</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-muted">
        Connect a repository to let Agent Forge spin up your AI engineering team and fill this command center with live activity.
      </p>
      <a
        href="#get-started"
        className="mt-6 inline-flex items-center justify-center rounded-16 bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
      >
        Connect workspace
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export function AICommandCenter({ workspaceId = 'demo-sprint-12' }: { workspaceId?: string | null } = {}) {
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [feedOpen, setFeedOpen] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(t);
  }, []);

  const empty = workspaceId === null || workspaceId === undefined || workspaceId === '';

  return (
    <Section id="command-center" ariaLabelledBy="command-center-heading" className="relative scroll-mt-20 pt-20">
      {/* Background: warm glowing grid + particles */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-24 h-[380px] w-[820px] -translate-x-1/2 rounded-full robo-halo opacity-70 animate-glow-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-primary)_1px,transparent_1px)] bg-[size:56px_56px] opacity-20 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
        {!reduce && (
          <>
            <span className="absolute left-[12%] top-[22%] h-1.5 w-1.5 rounded-full bg-amber-200/60 animate-float-slow" />
            <span className="absolute right-[14%] top-[30%] h-1 w-1 rounded-full bg-amber-100/50 animate-float-slow" style={{ animationDelay: '1.4s' }} />
            <span className="absolute left-[20%] bottom-[18%] h-1 w-1 rounded-full bg-indigo-300/50 animate-float-slow" style={{ animationDelay: '2.6s' }} />
            <span className="absolute right-[22%] bottom-[26%] h-1.5 w-1.5 rounded-full bg-emerald-300/40 animate-float-slow" style={{ animationDelay: '3.4s' }} />
          </>
        )}
      </div>

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/5 px-3 py-1 text-xs font-medium accent-amber">
            <Radio className="h-3.5 w-3.5" aria-hidden="true" />
            Live orchestration
          </span>
          <h2 id="command-center-heading" className="mt-5 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl font-heading">
            AI Command Center
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Watch Agent Forge turn client requirements into production-ready software through intelligent automation.
          </p>
        </div>

        <motion.div
          className="mt-14"
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: '-80px' },
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
              })}
        >
          {loading ? (
            <CommandCenterSkeleton />
          ) : empty ? (
            <EmptyWorkspace />
          ) : (
            <div className="relative overflow-hidden rounded-3xl glass shadow-card" role="region" aria-label="AI Command Center dashboard">
              {/* Window chrome */}
              <div className="flex items-center gap-2 border-b border-border-primary bg-bg-secondary/50 px-5 py-3">
                <span className="h-3 w-3 rounded-full bg-border-primary" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-border-primary" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-border-primary" aria-hidden="true" />
                <span className="ml-4 hidden text-xs font-medium text-text-muted sm:block">agentforge — AI Command Center</span>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-300">
                  <StatusDot tone="green" label="Live" />
                  Live
                </span>
              </div>

              <div className="p-5 sm:p-6">
                {/* ROW 1 — agent status cards (swipeable on mobile) */}
                <div
                  className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0"
                  role="list"
                  aria-label="Live AI agent status"
                >
                  {agents.map((agent, index) => {
                    const Icon = agent.icon;
                    return (
                      <motion.article
                        key={agent.id}
                        role="listitem"
                        aria-label={`${agent.name}, status ${agent.status}`}
                        className={`card-warm glass w-[270px] shrink-0 snap-center rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1 sm:w-[300px] lg:w-auto ${
                          agent.id === 'qa' ? 'shadow-[0_0_28px_rgba(16,185,129,0.18)]' : ''
                        }`}
                        {...(reduce
                          ? {}
                          : {
                              initial: { opacity: 0, y: 20 },
                              whileInView: { opacity: 1, y: 0 },
                              viewport: { once: true, margin: '-40px' },
                              transition: { duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as const },
                            })}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary shadow-glow-blue">
                            <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-primary bg-bg-tertiary px-2 py-1 text-[10px] font-semibold text-text-secondary">
                            <StatusDot tone={agent.tone} label={agent.status} />
                            {agent.status}
                          </span>
                        </div>
                        <h3 className="mt-4 text-sm font-bold text-text-primary font-heading">{agent.name}</h3>
                        <ul className="mt-3 space-y-1.5">
                          {agent.outputs.map((o) => (
                            <li key={o.label} className="flex items-baseline justify-between gap-2 text-xs">
                              <span className="text-text-muted">{o.label}</span>
                              <span
                                className={`shrink-0 font-bold ${
                                  agent.id === 'qa' && o.value === 'Passed'
                                    ? 'text-emerald-600 dark:text-emerald-300'
                                    : 'stat-accent'
                                }`}
                              >
                                {o.value}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4" role="progressbar" aria-valuenow={agent.progress} aria-valuemin={0} aria-valuemax={100} aria-label={agent.progressLabel}>
                          <div className="flex h-1.5 overflow-hidden rounded-full bg-border-primary">
                            <motion.div
                              className={`h-full rounded-full ${
                                agent.id === 'qa'
                                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.8)]'
                                  : 'bg-gradient-to-r from-amber-500 via-[#fff5e6] to-amber-300 shadow-[0_0_10px_rgba(255,245,230,0.8)]'
                              }`}
                              initial={reduce ? { width: `${agent.progress}%` } : { width: 0 }}
                              whileInView={{ width: `${agent.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.1, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                            />
                          </div>
                        </div>
                        {agent.extra === 'timeline' && <PlanningTimeline />}
                        {agent.extra === 'commits' && <RepoActivity />}
                        {agent.extra === 'checks' && (
                          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-300">
                            <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                            All suites healthy
                          </p>
                        )}
                      </motion.article>
                    );
                  })}
                </div>

                {/* ROW 2 — workflow + side panels */}
                <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
                  {/* Workflow pipeline */}
                  <div className="card-warm glass rounded-2xl p-5 sm:p-6 xl:col-span-2" aria-label="Delivery workflow pipeline">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-text-primary font-heading">Requirements → Deployment</h3>
                      <span className="text-[11px] font-medium text-text-muted">Hover a node for details</span>
                    </div>

                    <ol className="mt-6 flex flex-col lg:flex-row lg:items-stretch" aria-label="Workflow stages">
                      {workflow.map((node, i) => {
                        const Icon = node.icon;
                        const isLast = i === workflow.length - 1;
                        const isFirst = i === 0;
                        return (
                          <li key={node.label} className="relative flex flex-1 gap-3 pb-5 last:pb-0 lg:flex-col lg:items-center lg:gap-3 lg:pb-0 lg:text-center">
                            <div
                              className="group relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all"
                              tabIndex={0}
                              role="button"
                              aria-label={`${node.label}: ${node.role}`}
                              aria-current={node.state === 'active' ? 'step' : undefined}
                            >
                              {node.state === 'active' && !reduce && (
                                <span className="absolute inset-0 animate-ping rounded-xl bg-amber-300/20" aria-hidden="true" />
                              )}
                              <span
                                className={`relative inline-flex h-10 w-10 items-center justify-center rounded-xl border ${
                                  node.state === 'done'
                                    ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-600 dark:text-emerald-300'
                                    : node.state === 'active'
                                      ? 'border-amber-300/60 bg-amber-300/10 text-amber-600 shadow-[0_0_18px_rgba(255,245,230,0.5)] dark:text-amber-200'
                                      : 'border-border-primary bg-bg-tertiary text-text-muted'
                                }`}
                              >
                                <Icon className="h-5 w-5" aria-hidden="true" />
                              </span>
                              {/* Tooltip */}
                              <span
                                role="tooltip"
                                className={`pointer-events-none absolute bottom-full z-20 mb-2 w-52 rounded-xl border border-border-primary bg-bg-secondary px-3 py-2 text-left text-[11px] font-normal leading-relaxed text-text-body opacity-0 shadow-warm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                                  isFirst
                                    ? 'left-0 lg:left-0'
                                    : isLast
                                      ? 'right-0 lg:right-0'
                                      : 'left-1/2 -translate-x-1/2'
                                }`}
                              >
                                <span className="mb-0.5 block text-xs font-bold text-text-primary">{node.label}</span>
                                {node.role}
                              </span>
                            </div>
                            {/* Label */}
                            <div className="min-w-0 lg:px-1">
                              <p className={`text-sm font-semibold ${node.state === 'todo' ? 'text-text-muted' : 'text-text-primary'}`}>
                                {node.label}
                                {node.state === 'active' && (
                                  <span className="ml-2 whitespace-nowrap rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-300">
                                    In progress
                                  </span>
                                )}
                              </p>
                              <p className="mt-0.5 text-xs text-text-muted lg:hidden">{node.role}</p>
                            </div>
                            {!isLast && (
                              <>
                                {/* Vertical connector (mobile timeline) */}
                                <span
                                  className={`cc-flow-y absolute bottom-0 left-5 top-11 w-px lg:hidden ${node.state === 'todo' ? 'bg-border-primary' : 'bg-emerald-400/40'}`}
                                  aria-hidden="true"
                                />
                                {/* Horizontal connector (desktop pipeline) */}
                                <span
                                  className={`cc-flow-x absolute top-5 hidden h-px lg:block ${node.state === 'todo' ? 'bg-border-primary' : 'bg-emerald-400/40'}`}
                                  style={{ left: 'calc(50% + 26px)', right: 'calc(-50% + 26px)' }}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  </div>

                  {/* Side column: activity feed + sprint widget */}
                  <div className="flex flex-col gap-4">
                    <div className="card-warm glass rounded-2xl p-5">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between text-left"
                        onClick={() => setFeedOpen((v) => !v)}
                        aria-expanded={feedOpen}
                        aria-controls="cc-activity-feed"
                      >
                        <span className="flex items-center gap-2 text-sm font-bold text-text-primary font-heading">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" aria-hidden="true" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                          </span>
                          AI Activity Feed
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 text-text-muted transition-transform lg:hidden ${feedOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>
                      <ul
                        id="cc-activity-feed"
                        className={`mt-4 space-y-3 ${feedOpen ? 'block' : 'hidden'} lg:block`}
                        aria-label="Recent AI activity"
                      >
                        {activityFeed.map((item, i) => (
                          <motion.li
                            key={`${item.text}-${i}`}
                            className="flex items-start gap-3"
                            {...(reduce
                              ? {}
                              : {
                                  initial: { opacity: 0, x: 16 },
                                  whileInView: { opacity: 1, x: 0 },
                                  viewport: { once: true },
                                  transition: { duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
                                })}
                          >
                            <span className="mt-1.5 flex flex-col items-center" aria-hidden="true">
                              <span className={`h-2 w-2 rounded-full ${item.tone}`} />
                              {i < activityFeed.length - 1 && <span className="mt-1 w-px flex-1 bg-border-primary" style={{ minHeight: '14px' }} />}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-xs font-medium text-text-secondary">{item.text}</span>
                              <span className="block text-[10px] text-text-muted">{item.time}</span>
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="card-warm glass rounded-2xl p-5" aria-label="Mini sprint progress">
                      <SprintRing />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
