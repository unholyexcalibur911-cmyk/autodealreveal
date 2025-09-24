import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Hero from "@/components/Hero";

async function getHomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const res = await fetch(
    `${baseUrl}/api/pages?populate[sections][populate]=*`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.data?.[0] || {};
}

export default async function Home() {
  const page = await getHomePage();
  console.log("Sections:", page.sections);

  return (
    <main>
      {page.sections?.map((section: any, index: number) => {
        switch (section.__component) {
          case "sections.hero":
            return (
              <Hero
                key={index}
                title={section.Title}
                subtitle={section.Subtitle}
                backgroundImage={
                  section.BackgroundImage?.url ||
                  section.BackgroundImage?.formats?.large?.url
                    ? {
                        url:
                          section.BackgroundImage?.formats?.large?.url ||
                          section.BackgroundImage?.url,
                      }
                    : undefined
                }
                buttonText={section.ButtonText}
                buttonURL={section.ButtonURL}
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
                buttonText={section.button_text}
                buttonURL={section.button_url}
                buttonText2={section.button_text_2}
                buttonURL2={section.button_url_2}
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
                buttonText={section.button_text}
                buttonURL={section.button_url}
                buttonText2={section.button_text_2}
                buttonURL2={section.button_url_2}
              />
              );
          default:
            return null;
        }
      })}
    </main>
  );
}
