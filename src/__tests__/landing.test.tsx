import { render, screen } from '@testing-library/react';
import { TechStrip } from '@/components/sections/TechStrip';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/Button';
import { StartupTeams } from '@/components/sections/StartupTeams';
import { Hero } from '@/components/sections/Hero';
import { CursorGlow } from '@/components/ui/CursorGlow';

describe('TechStrip', () => {
  it('renders the integration tools', () => {
    render(<TechStrip />);

    expect(screen.getByText('OpenAI')).toBeInTheDocument();
    expect(screen.getByText('Ollama')).toBeInTheDocument();
    expect(screen.getByText('Slack')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Jira')).toBeInTheDocument();
    expect(screen.getByText('Notion')).toBeInTheDocument();
    expect(screen.getByText('Google Calendar')).toBeInTheDocument();
    expect(screen.getByText(/already uses/)).toBeInTheDocument();
  });

  it('is labelled as integrations and tools', () => {
    render(<TechStrip />);
    expect(screen.getByLabelText('Integrations and tools')).toBeInTheDocument();
  });
});

describe('Button', () => {
  it('renders children and primary styling', () => {
    render(<Button>Get Started</Button>);
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
  });

  it('respects disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button', { name: /disabled/i })).toBeDisabled();
  });
});

describe('Footer', () => {
  it('renders product links', () => {
    render(<Footer />);
    expect(screen.getByRole('navigation', { name: 'Footer' })).toBeInTheDocument();
    expect(screen.getByText('Docs')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('describes the project management product', () => {
    render(<Footer />);
    expect(screen.getByText(/AI project manager/i)).toBeInTheDocument();
  });
});

describe('StartupTeams', () => {
  it('renders the four team personas', () => {
    render(<StartupTeams />);
    expect(screen.getByText('Founders')).toBeInTheDocument();
    expect(screen.getByText('Project Managers')).toBeInTheDocument();
    expect(screen.getByText('Developers')).toBeInTheDocument();
    expect(screen.getByText('Remote Teams')).toBeInTheDocument();
  });
});

describe('Hero orbit badges', () => {
  it('renders all five integration cards with category and connected state', () => {
    render(<Hero />);
    expect(screen.getByLabelText(/slack integration.*connected/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/jira integration.*connected/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/github integration.*connected/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/calendar integration.*connected/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notion integration.*connected/i)).toBeInTheDocument();
  });

  it('renders the robot video without a surrounding box', () => {
    render(<Hero />);
    const video = screen.getByLabelText(/agentforge ai robot/i);
    expect(video.tagName).toBe('VIDEO');
    // No ancestors may carry the old boxed-frame styling
    let el = video.parentElement;
    while (el) {
      expect(el.className).not.toMatch(/robo-frame/);
      el = el.parentElement;
    }
  });
});

describe('CursorGlow', () => {
  it('renders the night-mode cursor aura in dark mode', () => {
    render(<CursorGlow />);
    expect(screen.getByTestId('cursor-glow')).toBeInTheDocument();
  });
});
