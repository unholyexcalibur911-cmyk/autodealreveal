import Section1 from "@/components/Section1";
import Hero from "@/components/Hero";

export default async function ProductsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const res = await fetch(
    `${baseUrl}/api/pages?filters[slug][$eq]=${slug}&populate[sections][populate]=*`,
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
          default:
            return null;
        }
      })}
    </main>
  );
}
