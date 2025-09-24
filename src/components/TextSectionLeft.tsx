"use client";

import Image from "next/image";

interface TextSectionProps {
  title: string;
  content: string; // rich text (HTML from Strapi)
  background?: { url: string };
}

export default function TextSection({ title, content, background }: TextSectionProps) {
  return (
    <section className="relative py-24 text-black bg-stone-100">
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

  <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-3xl font-bold mb-12">{title}</h2>
        {content && (
          <div
            className="richtext text-lg md:text-xl mx-auto text-center "
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </section>
  );
}
