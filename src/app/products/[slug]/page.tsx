import ColumnItemSection from "@/components/ColumnItemSections";
import TextSectionLeft from "@/components/TextSectionLeft";
import TextSectionCenter from "@/components/TextSectionCenter";
import TextSection from "@/components/TextSections";
import ItemSection from "@/components/ItemSection";
import Section2 from "@/components/Section2";
import Section1 from "@/components/Section1";
import Hero from "@/components/Hero";

export default async function ProductsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const res = await fetch(
    `${baseUrl}/api/childpages?filters[slug][$eq]=${slug}&populate[page]=true&populate[sections][populate]=*`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const products = data.data?.[0] || {};

  if (!products) return <div className="p-100 text-7xl bg-black text-white text-center font-[Roboto]">404 | Page not found</div>;

  return (
    <main>
      {products.sections?.map((section: any, index: number) => {
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
          default:
            return null;
        }
      })}
    </main>
  );
}
