import TextSectionCenter from "@/components/TextSectionCenter";
import TextSectionLeft from "@/components/TextSectionLeft";
import Background from "@/components/DefaultBackground";
import TextSection from "@/components/TextSections";
import ItemSection from "@/components/ItemSection";
import Section2 from "@/components/Section2";
import Section1 from "@/components/Section1";
import Hero from "@/components/Hero";
import ContactUs from "@/components/ContactUs";
import Assets from "@/components/Assets/homepage.json";


export default async function Home() {
  return (
    <main className="bg-white/50">
      <Hero
        title={Assets.title}
        subtitle={Assets.subtitle}
        background={{ url: Assets.alternateVideo?.url ?? Assets.background?.url }}
      />
      <ContactUs />
    </main>
  );
}
