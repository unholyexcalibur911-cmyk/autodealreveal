import TextSectionCenter from "@/components/TextSectionLeft";
import TextSectionLeft from "@/components/TextSectionCenter";
import Background from "@/components/DefaultBackground";
import TextSection from "@/components/TextSections";
import ItemSection from "@/components/ItemSection";
import Section2 from "@/components/Section2";
import Section1 from "@/components/Section1";
import Hero from "@/components/Hero";

async function getHomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const res = await fetch(
      `${baseUrl}/api/pages?filters[slug]=home&populate=Sections.background&populate=Sections.image&populate=Sections.BackgroundImage&populate=Sections.item.icon&populate=Sections.column_item_content.image`  ,
    { cache: "no-store" }
  );

  if (!res.ok) { throw new Error("Failed to fetch home page data"); }

  const data = await res.json();
  return data.data?.[0] || {};
}

export default async function Home() {
  const page = await getHomePage();

  return (
    <main>
      {page.Sections?.map((section: any, index: number) => {
        const SectionBg = !section.background ? <Background /> : null;
        switch (section.__component) {
          case "sections.hero":
            return (
              <div className="relative" key={index}>
                {SectionBg}
                <Hero
                  title={section.title}
                  subtitle={section.subtitle}
                  background={
                    section.background ? { url: section.background.url } : undefined
                  }
                  buttonText={section.buttonText}
                  buttonURL={section.buttonURL}
                  buttonText_2={section.buttonText_2}
                  buttonURL_2={section.buttonURL_2}
                />
              </div>
            );
          case "sections.section1":
            return (
              <div className="relative" key={index}>
                {SectionBg}
                <Section1
                  title={section.title}
                  subtitle={section.subtitle}
                  content={section.content}
                  background={
                    section.background ? { url: section.background.url } : undefined
                  }
                  image={section.image ? { url: section.image.url } : undefined}
                  buttonText={section.buttonText}
                  buttonURL={section.buttonURL}
                  buttonText2={section.buttonText_2}
                  buttonURL2={section.buttonURL_2}
                />
              </div>
            );
          case "sections.section2":
            return (
              <div className="relative" key={index}>
                {SectionBg}
                <Section2
                  title={section.title}
                  subtitle={section.subtitle}
                  content={section.content}
                  background={
                    section.background ? { url: section.background.url } : undefined
                  }
                  image={section.image ? { url: section.image.url } : undefined}
                  buttonText={section.buttonText}
                  buttonURL={section.buttonURL}
                  buttonText2={section.buttonText_2}
                  buttonURL2={section.buttonURL_2}
                />
              </div>
            );
          case "sections.item-section":
            return (
              <div className="relative" key={index}>
                {SectionBg}
                <ItemSection
                  title={section.title}
                  items={section.item || []}
                  background={
                    section.background ? { url: section.background.url } : undefined
                  }
                />
              </div>
            );
          case "sections.text-section":
            return (
              <div className="relative" key={index}>
                {SectionBg}
                <TextSection
                  title={section.title}
                  content={section.content}
                  background={
                    section.background ? { url: section.background.url } : undefined
                  }
                />
              </div>
            );
          case "sections.text-left":
            return (
              <div className="relative" key={index}>
                {SectionBg}
                <TextSectionLeft
                  title={section.title}
                  content={section.content}
                  background={
                    section.background ? { url: section.background.url } : undefined
                  }
                />
              </div>
            );
          case "sections.text-center":
            return (
              <div className="relative" key={index}>
                {SectionBg}
                <TextSectionCenter
                  title={section.title}
                  content={section.content}
                  background={
                    section.background ? { url: section.background.url } : undefined
                  }
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </main>
  );
}
