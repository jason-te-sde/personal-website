import { Bento, Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Contact, EducationList, ExperienceList, StackGrid } from "@/components/sections";
import { Section } from "@/components/section";

export default function Home() {
  return (
    <main id="top" className="mx-auto max-w-5xl px-6">
      <Hero />
      <Bento />

      <Section id="work" index="01" title="Selected work">
        <Work />
      </Section>

      <Section id="experience" index="02" title="Experience">
        <ExperienceList />
      </Section>

      <Section id="stack" index="03" title="Stack">
        <StackGrid />
      </Section>

      <Section index="04" title="Education">
        <EducationList />
      </Section>

      <Contact />
    </main>
  );
}
