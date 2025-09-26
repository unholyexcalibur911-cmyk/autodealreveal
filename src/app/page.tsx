import ColumnItemSection from "@/components/ColumnItemSections";
import TextSectionCenter from "@/components/TextSectionLeft";
import TextSectionLeft from "@/components/TextSectionCenter";
import ImageCarousel from "@/components/ImageCarousel";
import TextSection from "@/components/TextSections";
import ItemSection from "@/components/ItemSection";
import Section2 from "@/components/Section2";
import Section1 from "@/components/Section1";
import Hero from "@/components/Hero";

async function getHomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const res = await fetch(
      `${baseUrl}/api/pages?filters[slug]=home&populate[Sections][populate]=*`,
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
        switch (section.__component) {
          case "sections.hero":
            return (
              <Hero
                key={index}
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
            );
          case "sections.section1":
            return (
              <Section1
                key={index}
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
            );
          case "sections.section2":
            return (
              <Section2
                key={index}
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
            );
          case "sections.item-section":
            return (
              <ItemSection
                key={index}
                title={section.title}
                items={section.item || []}
                background={
                  section.background ? { url: section.background.url } : undefined
                }
              />
            );
          case "sections.text-section":
            return (
              <TextSection
                key={index}
                title={section.title}
                content={section.content}
                background={
                  section.background ? { url: section.background.url } : undefined
                }
              />
            );
          case "sections.text-left":
            return (
              <TextSectionLeft
                key={index}
                title={section.title}
                content={section.content}
                background={
                  section.background ? { url: section.background.url } : undefined
                }
              />
            );
          case "sections.text-center":
            return (
              <TextSectionCenter
                key={index}
                title={section.title}
                content={section.content}
                background={
                  section.background ? { url: section.background.url } : undefined
                }
              />
            );
          case "sections.column-item-section": 
            return (
              <ColumnItemSection
                key={index}
                title={section.title}
                background={
                  section.background ? { url: section.background.url } : undefined
                }
                column_item_content={section.column_item_content || []}
              />
            );
          case "sections.image-carousel": // <-- Carousel / Not sure if working
            return (
              <ImageCarousel
                key={index}
                title={section.title}
                images={section.images || []}
              />
            );
          default:
            return null;
        }
      })}
    </main>
  );
}
