import Section1 from "@/components/Section1";

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
      <div className="bg-stone-200 flex min-h-screen flex-col items-center justify-between p-24">TEXT</div>
      {page.sections?.map((section: any, index: number) => (
        <div key={index} className="my-8 p-6 bg-white rounded shadow flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2">{section.title || "Dummy Section Title"}</h2>
          <p className="mb-4">{section.subtitle || "This is some dummy text for the section."}</p>
          <img
            src={section.background?.url || "https://via.placeholder.com/400x150?text=Dummy+Image"}
            alt={section.title || "Dummy Image"}
            className="w-96 h-36 object-cover rounded"
          />
          <Section1
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
        </div>
      ))}
    </main>
  );
}