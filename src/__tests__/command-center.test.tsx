import { render, screen, act } from '@testing-library/react';
import { AICommandCenter } from '@/components/sections/AICommandCenter';

jest.useFakeTimers();

function advancePastSkeleton() {
  act(() => {
    jest.advanceTimersByTime(1000);
  });
}

describe('AICommandCenter', () => {
  it('shows a skeleton loader while data loads', () => {
    render(<AICommandCenter />);
    expect(screen.getByRole('status', { name: /loading ai command center/i })).toBeInTheDocument();
  });

  it('renders the title, subtitle and four agent cards', async () => {
    render(<AICommandCenter />);
    advancePastSkeleton();

    expect(await screen.findByRole('heading', { name: /ai command center/i })).toBeInTheDocument();
    expect(
      screen.getByText(/turn client requirements into production-ready software/i)
    ).toBeInTheDocument();
    // Names appear in both cards and workflow tooltips, so assert multiples
    expect(screen.getAllByText('Requirements Analyst').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Feature Planner').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('GitHub Review Agent').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('QA Verification Agent').length).toBeGreaterThanOrEqual(1);
  });

  it('renders agent outputs without fake business metrics', async () => {
    render(<AICommandCenter />);
    advancePastSkeleton();

    expect(await screen.findByText('Requirements Extracted')).toBeInTheDocument();
    expect(screen.getByText('Features Planned')).toBeInTheDocument();
    expect(screen.getByText('PRs Reviewed')).toBeInTheDocument();
    expect(screen.getByText('Accessibility Score')).toBeInTheDocument();
    expect(screen.queryByText('Hours Saved')).not.toBeInTheDocument();
    expect(screen.queryByText('Projects Managed')).not.toBeInTheDocument();
  });

  it('renders the workflow pipeline, activity feed and sprint widget', async () => {
    render(<AICommandCenter />);
    advancePastSkeleton();

    expect((await screen.findAllByText('Deployment Ready')).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Task Breakdown').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Sprint #12 created')).toBeInTheDocument();
    expect(screen.getByText('PR #42 reviewed')).toBeInTheDocument();
    expect(screen.getByText('Sprint Alpha')).toBeInTheDocument();
    expect(screen.getByText('89 / 120')).toBeInTheDocument();
  });

  it('shows an empty state when no workspace exists', async () => {
    render(<AICommandCenter workspaceId={null} />);
    advancePastSkeleton();

    expect(await screen.findByText(/no workspace connected/i)).toBeInTheDocument();
    expect(screen.getByText(/connect workspace/i)).toBeInTheDocument();
  });
});
