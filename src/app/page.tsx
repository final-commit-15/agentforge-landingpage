import { Navigation } from '@/components/sections/Navigation';
import { Hero } from '@/components/sections/Hero';
import { TechStrip } from '@/components/sections/TechStrip';
import { CoreFeatures } from '@/components/sections/CoreFeatures';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { AIWorkforce } from '@/components/sections/AIWorkforce';
import { DemoVideo } from '@/components/sections/DemoVideo';
import { WhyAgentForge } from '@/components/sections/WhyAgentForge';
import { FAQ } from '@/components/sections/FAQ';
import { ProjectVideo } from '@/components/sections/ProjectVideo';
import { StartupTeams } from '@/components/sections/StartupTeams';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen">
        <Hero />
        <TechStrip />
        <CoreFeatures />
        <HowItWorks />
        <AIWorkforce />
        <DemoVideo />
        <WhyAgentForge />
        <FAQ />
        <ProjectVideo />
        <StartupTeams />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
