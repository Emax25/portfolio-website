import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { ProjectsSection } from '@/components/sections/projects';
import { Experience } from '@/components/sections/experience';
import { Education } from '@/components/sections/education';
import { Contact } from '@/components/sections/contact';

export function Home() {
  return (
    <div className="w-full space-y-16 md:space-y-24">
      {/* Hero Section - Full width background styling inside component */}
      <Hero />

      {/* Main Content Sections - Max-width constrained */}
      <div className="container mx-auto px-4 pb-24 max-w-4xl space-y-16 md:space-y-24">
        <About />
        <Skills />
        <ProjectsSection />
        <Experience />
        <Education />
        <Contact />
      </div>
    </div>
  );
}
