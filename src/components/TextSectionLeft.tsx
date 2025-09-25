"use client";

import Image from "next/image";

interface TextSectionProps {
  title: string;
  content: string; // rich text (HTML from Strapi)
  background?: { url: string };
}

export default function TextSection({ title, content, background }: TextSectionProps) {
  const formattedContent = content ? content.replace(/\n/g, "<br />") : "";
  return (
    <div className="min-h-[500px] bg-stone-100">
      <section className="relative py-24 text-black ">
        {background?.url && (
          <Image
            src={background.url}
            alt={title || "Background image"}
            fill
            quality={100}
            priority
            className="object-cover brightness-50 -z-10"
          />
        )}

    <div className="text-stone-800 relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12">{title}</h2>
          {content && (
            <div
              className="richtext text-lg md:text-xl mx-auto text-left "
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          )}
        </div>
      </section>
    </div>
  );
}
