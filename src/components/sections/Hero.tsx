'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Slack,
  Github,
  NotepadText,
  CalendarDays,
  Kanban,
  Sparkles,
  Zap,
  Shield,
  Users,
  Brain,
  Globe,
  ArrowUpRight,
} from 'lucide-react';
import { LinkButton, DemoIcon } from '@/components/ui/Button';
import { useCursorLook } from '@/hooks/useCursorLook';

interface OrbitBadge {
  icon: typeof Slack;
  name: string;
  category: string;
  tile: string;
  /** absolute position of the card on the stage */
  position: string;
  /** where the robot looks when this card is hovered (cursor-space -0.5..0.5) */
  look: [number, number];
  /** anchor point (0-160 / 0-90 space) for the connector line */
  anchor: [number, number];
  orbitDuration: string;
  orbitDelay: string;
}

const badges: OrbitBadge[] = [
  {
    icon: Slack,
    name: 'Slack',
    category: 'Team Communication',
    tile: 'bg-[#E01E5A]/10 text-[#E01E5A] dark:text-[#ff7aa8]',
    position: 'top-[4%] -left-2 sm:-left-10',
    look: [-0.35, -0.15],
    anchor: [16, 12],
    orbitDuration: '9s',
    orbitDelay: '0s',
  },
  {
    icon: Github,
    name: 'GitHub',
    category: 'Code Repository',
    tile: 'bg-slate-500/10 text-text-primary',
    position: 'top-[1%] -right-2 sm:-right-10',
    look: [0.35, -0.2],
    anchor: [144, 10],
    orbitDuration: '11s',
    orbitDelay: '1.2s',
  },
  {
    icon: CalendarDays,
    name: 'Calendar',
    category: 'Meetings & Deadlines',
    tile: 'bg-[#1A73E8]/10 text-[#1A73E8] dark:text-[#8AB4F8]',
    position: 'top-[38%] -left-4 sm:-left-14',
    look: [-0.4, 0.05],
    anchor: [10, 36],
    orbitDuration: '10s',
    orbitDelay: '2.1s',
  },
  {
    icon: Kanban,
    name: 'Jira',
    category: 'Project Management',
    tile: 'bg-[#2684FF]/10 text-[#2684FF] dark:text-[#7aafff]',
    position: 'bottom-[24%] -right-3 sm:-right-12',
    look: [0.38, 0.18],
    anchor: [150, 62],
    orbitDuration: '12s',
    orbitDelay: '0.6s',
  },
  {
    icon: NotepadText,
    name: 'Notion',
    category: 'Documentation',
    tile: 'bg-slate-500/10 text-text-primary',
    position: 'bottom-[1%] left-[6%]',
    look: [-0.25, 0.3],
    anchor: [32, 84],
    orbitDuration: '9.5s',
    orbitDelay: '1.7s',
  },
];

const stats = [
  { value: '10x', label: 'Faster Delivery' },
  { value: '90%', label: 'Less Manual Work' },
  { value: '24/7', label: 'AI Coverage' },
  { value: '50+', label: 'Integrations' },
];

const highlights = [
  { icon: Zap, title: 'Instant Setup', desc: 'Connect in minutes' },
  { icon: Brain, title: 'AI Agents', desc: '9 specialized agents' },
  { icon: Shield, title: 'Secure', desc: 'Enterprise grade' },
  { icon: Users, title: 'Collaborative', desc: 'Built for teams' },
];

const ROBO_VIDEO = 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_robo_video.mp4';
const ROBO_POSTER = 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_robo_poster.jpg';

/** Connector curve from a card anchor toward the robot core (160x90 stage space). */
function connectorPath(anchor: [number, number]) {
  const [ax, ay] = anchor;
  return `M ${ax} ${ay} Q 80 ${ay} 80 42`;
}

export function Hero() {
  const reduce = useReducedMotion();
  const {
    rotateX,
    rotateY,
    roboX,
    roboY,
    eyeX,
    eyeY,
    orbitX,
    orbitY,
    blinking,
    eyeBright,
    lookAt,
    releaseLook,
  } = useCursorLook({ disabled: reduce === true });

  const fadeUp = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      };

  const roboEntrance = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 28, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 },
      };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center" aria-labelledby="hero-heading">
      {/* Background: spotlight room — golden grid + particles + halo */}
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[620px] w-[620px] rounded-full robo-halo animate-glow-pulse" />
        <div className="absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full bg-indigo-500/5 blur-[150px]" />
        <div className="absolute top-1/3 -right-24 h-[380px] w-[380px] rounded-full bg-amber-400/5 blur-[150px]" />
        <div className="hero-grid absolute inset-0 bg-[size:60px_60px]" />
        <span className="absolute left-[10%] top-[24%] h-1.5 w-1.5 rounded-full bg-amber-200/60 animate-float-slow" />
        <span className="absolute right-[12%] top-[32%] h-1 w-1 rounded-full bg-amber-100/50 animate-float-slow" style={{ animationDelay: '1.4s' }} />
        <span className="absolute left-[16%] bottom-[20%] h-1 w-1 rounded-full bg-indigo-300/50 animate-float-slow" style={{ animationDelay: '2.6s' }} />
        <span className="absolute right-[18%] bottom-[28%] h-1.5 w-1.5 rounded-full bg-emerald-300/40 animate-float-slow" style={{ animationDelay: '3.4s' }} />
      </div>

      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-6 pb-16 pt-16 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pb-24 lg:pt-20">
        <motion.div className="lg:col-span-6" {...fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/5 px-3 py-1 text-xs font-medium accent-amber">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Now accepting early access
          </span>

          <h1
            id="hero-heading"
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-[3.5rem] font-heading"
          >
            Your AI Project Manager
            <br />
            <span className="headline-accent">Never Misses a Deadline.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-body">
            Automate sprint planning, standups, meeting notes, reminders, reports, and project tracking with AI.
          </p>

          {/* Stats bar */}
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.value} className="text-center sm:text-left">
                <div className="stat-accent text-2xl sm:text-3xl font-bold font-heading">{stat.value}</div>
                <div className="text-sm text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div
            className="mt-8 flex flex-wrap items-center gap-4"
            onMouseEnter={() => lookAt(-0.45, 0.05)}
            onMouseLeave={releaseLook}
          >
            <LinkButton href="http://localhost:5173" size="lg" className="group relative overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <span
                className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-400/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
            </LinkButton>
            <LinkButton href="#demo" variant="demo" size="lg" icon={DemoIcon}>
              Watch Demo
            </LinkButton>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-muted">
            <span className="inline-flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-600 dark:text-amber-400/70" aria-hidden="true" />
              SOC2 Compliant
            </span>
            <span className="w-px h-4 bg-border-primary" aria-hidden="true" />
            <span className="inline-flex items-center gap-2">
              <Globe className="h-4 w-4 text-amber-600 dark:text-amber-400/70" aria-hidden="true" />
              Global CDN
            </span>
            <span className="w-px h-4 bg-border-primary" aria-hidden="true" />
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-amber-600 dark:text-amber-400/70" aria-hidden="true" />
              Team Ready
            </span>
          </div>
        </motion.div>

        <div className="relative lg:col-span-6">
          <div className="relative mx-auto w-full max-w-[520px]">
            {/* Robo stage — the orbit layer is positioned against the video only,
                so badges can never overlap the highlight cards below */}
            <div className="relative" style={{ perspective: 1000 }}>
              {/* Ambient halo + floor spotlight (no box anywhere) */}
              <div
                className="absolute left-1/2 top-1/2 -z-10 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full robo-halo animate-glow-pulse"
                aria-hidden="true"
              />
              <div className="robo-spotlight absolute left-1/2 top-[58%] -z-10 h-[300px] w-[440px] -translate-x-1/2" aria-hidden="true" />

              {/* Motion robo — transparent, floating. Outer layer follows the
                  cursor (look-at), inner layer keeps the idle breathing. */}
              <motion.div
                {...roboEntrance}
                style={reduce ? undefined : { rotateX, rotateY, x: roboX, y: roboY, transformStyle: 'preserve-3d' }}
              >
                <div className={reduce ? undefined : 'animate-robo-float'}>
                  <div className="relative">
                    <video
                      src={ROBO_VIDEO}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      disablePictureInPicture={false}
                      className="robo-video"
                      aria-label="AgentForge AI robot project management demonstration"
                      poster={ROBO_POSTER}
                    />
                    {/* Visor bloom: warm eye-light that drifts with the cursor,
                        brightens on hover and blinks while idle. Soft by design
                        so it reads as head glow even as the video moves. */}
                    {!reduce && (
                      <motion.div
                        className="visor-bloom absolute left-[33%] top-[24%] h-[15%] w-[34%]"
                        style={{ x: eyeX, y: eyeY }}
                        animate={{ opacity: blinking ? 0.12 : eyeBright ? 0.9 : 0.55 }}
                        transition={{ duration: 0.18 }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Floor shadow grounding the float */}
              <div className="robo-floor absolute -bottom-3 left-1/2 h-[30px] w-[58%] -translate-x-1/2" aria-hidden="true" />

              {/* Orbit layer: connectors + floating integration cards (sm+) */}
              <motion.div
                className="pointer-events-none absolute inset-0 z-10 hidden sm:block"
                style={reduce ? undefined : { x: orbitX, y: orbitY }}
                aria-label="Connected integrations"
              >
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 160 90"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#fff5e6" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>
                  {badges.map((b) => (
                    <path
                      key={b.name}
                      d={connectorPath(b.anchor)}
                      fill="none"
                      stroke="url(#orbitGrad)"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeDasharray="4 5"
                      className="orbit-line"
                      opacity="0.55"
                    />
                  ))}
                  {!reduce && (
                    <>
                      <circle r="2.2" fill="#fff5e6" className="orbit-pulse">
                        <animateMotion dur="4.5s" repeatCount="indefinite" path={connectorPath(badges[0].anchor)} />
                      </circle>
                      <circle r="2.2" fill="#fcd34d" className="orbit-pulse">
                        <animateMotion dur="6s" begin="-3s" repeatCount="indefinite" path={connectorPath(badges[3].anchor)} />
                      </circle>
                    </>
                  )}
                </svg>

                {badges.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.name} className={`absolute ${b.position}`}>
                      <motion.div
                        className="animate-orbit"
                        style={{ '--orbit-dur': b.orbitDuration, '--orbit-delay': b.orbitDelay } as React.CSSProperties}
                        {...(reduce
                          ? {}
                          : {
                              initial: { opacity: 0 },
                              animate: { opacity: 1 },
                              transition: { delay: 0.5 + i * 0.1, duration: 0.4 },
                            })}
                      >
                        <div
                          role="article"
                          aria-label={`${b.name} integration, ${b.category}, connected`}
                          tabIndex={0}
                          onMouseEnter={() => lookAt(b.look[0], b.look[1])}
                          onMouseLeave={releaseLook}
                          onFocus={() => lookAt(b.look[0], b.look[1])}
                          onBlur={releaseLook}
                          className="orbit-card pointer-events-auto w-[176px] rounded-2xl p-3 outline-none"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${b.tile}`}>
                              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                            </span>
                            <span className="min-w-0">
                              <span className="flex items-center gap-0.5 text-[13px] font-bold leading-tight text-text-primary">
                                <span className="truncate">{b.name}</span>
                                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-text-muted" aria-hidden="true" />
                              </span>
                              <span className="block truncate text-[11px] leading-tight text-text-muted">{b.category}</span>
                            </span>
                          </div>
                          <div className="mt-2.5 flex items-center gap-1.5 border-t border-border-primary pt-2">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" aria-hidden="true" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
                              Connected
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Compact integration row for small screens */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 sm:hidden" aria-label="Connected integrations">
              {badges.map((b) => {
                const Icon = b.icon;
                return (
                  <span
                    key={b.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border-primary bg-bg-secondary px-3 py-1.5 text-xs font-semibold text-text-primary"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {b.name}
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  </span>
                );
              })}
            </div>

            {/* Feature highlights below robot */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="card-warm group relative glass rounded-xl p-4"
                  {...(reduce
                    ? {}
                    : {
                        initial: { opacity: 0, y: 16 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.6 + i * 0.08, duration: 0.5 },
                      })}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" aria-hidden="true" />
                  <div className="relative flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-400/10 group-hover:bg-amber-400/20 transition-colors">
                      <item.icon className="h-5 w-5 text-amber-500 dark:text-amber-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary text-sm">{item.title}</p>
                      <p className="text-xs text-text-muted">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
