import ColumnItemSection from "@/components/ColumnItemSections";
import TextSectionCenter from "@/components/TextSectionLeft";
import TextSectionLeft from "@/components/TextSectionCenter";
import Background from "@/components/DefaultBackground";
import TextSection from "@/components/TextSections";
import ItemSection from "@/components/ItemSection";
import Brands from "@/components/BrandsLogos";
import Section2 from "@/components/Section2";
import Section1 from "@/components/Section1";
import Hero from "@/components/Hero";

export default async function Page({ params }: 
  { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const res = await fetch(
      `${baseUrl}/api/pages?filters[slug][$eq]=${slug}&populate[Sections][populate]=*`,
      { cache: "no-store" }
    );

  const json = await res.json();
  const page = json.data?.[0];

  if (!page) return <div className="p-100 text-7xl bg-black text-white text-center font-[Roboto]">404 | Page not found</div>;

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
          case "sections.column-item-section": 
            return (
              <div className="relative" key={index}>
                {SectionBg}
                <ColumnItemSection
                  title={section.title}
                  background={
                    section.background ? { url: section.background.url } : undefined
                  }
                  column_item_content={section.column_item_content || []}
                />
              </div>
            );
          case "sections.brands":
            return (
              <div className="relative" key={index}>
                {SectionBg}
                <Brands
                  title={section.title}
                  image={section.image ? { url: section.image.url } : undefined}
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
