import { render, screen } from '@testing-library/react';
import { TechStrip } from '@/components/sections/TechStrip';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/Button';
import { StartupTeams } from '@/components/sections/StartupTeams';

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
