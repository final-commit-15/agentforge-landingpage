'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { Container, Section } from '@/components/ui/Container';

const VIDEO_SRC = '/agent-forge-project-video.mp4';

export function ProjectVideo() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const startWithSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    const playback = video.play();
    if (playback) {
      playback
        .then(() => setSoundOn(true))
        .catch(() => {
          video.muted = true;
          setSoundOn(false);
        });
    } else {
      setSoundOn(true);
    }
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      startWithSound();
    } else {
      video.muted = true;
      setSoundOn(false);
    }
  }, [startWithSound]);

  useEffect(() => {
    if (reduce) return undefined;
    const unmuteOnce = () => {
      startWithSound();
      window.removeEventListener('pointerdown', unmuteOnce);
      window.removeEventListener('keydown', unmuteOnce);
      window.removeEventListener('touchstart', unmuteOnce);
    };
    window.addEventListener('pointerdown', unmuteOnce);
    window.addEventListener('keydown', unmuteOnce);
    window.addEventListener('touchstart', unmuteOnce, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', unmuteOnce);
      window.removeEventListener('keydown', unmuteOnce);
      window.removeEventListener('touchstart', unmuteOnce);
    };
  }, [reduce, startWithSound]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduce) return;
    const attempt = video.play();
    if (attempt) {
      attempt.catch(() => setBlocked(true));
    }
  }, [reduce]);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (video) setSoundOn(!video.muted);
  }, []);

  return (
    <Section id="project-video" ariaLabelledBy="project-video-heading" className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="project-video-heading" className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl font-heading">
            AgentForge Project Video
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            See our AI project management in action.
          </p>
        </div>

        <motion.div
          className="card-warm relative mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl glass shadow-card"
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: '-80px' },
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
              })}
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            autoPlay={!reduce}
            loop
            muted={!reduce}
            playsInline
            controls
            preload={reduce ? 'metadata' : 'auto'}
            className="block w-full"
            aria-label="AgentForge project demo video"
            onPlay={handlePlay}
          />

          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={soundOn}
            className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-border-primary bg-bg-secondary/90 px-3 py-1.5 text-xs font-semibold text-text-primary shadow-sm backdrop-blur transition-colors hover:border-amber-400/40"
          >
            {soundOn ? (
              <Volume2 className="h-3.5 w-3.5 text-brand-primary" aria-hidden="true" />
            ) : (
              <VolumeX className="h-3.5 w-3.5 text-text-muted" aria-hidden="true" />
            )}
            {soundOn ? 'Sound on' : 'Sound off'}
          </button>

          {blocked && (
            <button
              type="button"
              onClick={() => {
                setBlocked(false);
                startWithSound();
              }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg-primary/60 backdrop-blur-sm transition-colors hover:bg-bg-primary/40"
            >
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary text-white shadow-cta">
                <Play className="h-7 w-7 translate-x-0.5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-text-primary">Play project video with sound</span>
            </button>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}