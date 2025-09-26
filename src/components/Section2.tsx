"use client";

import Image from "next/image";

interface Section2Props {
  title: string;
  subtitle?: string;
  content?: string; // rich text from Strapi
  image?: { url: string };
  background?: { url: string };
  buttonText?: string;
  buttonURL?: string;
  buttonText2?: string;   // ✅ Added
  buttonURL2?: string;    // ✅ Added
}

export default function Section2({
  title,
  subtitle,
  content,
  image,
  background,
  buttonText,
  buttonURL,
  buttonText2,
  buttonURL2,
}: Section2Props) {
  // Convert \n to <br /> in content if present
  const formattedContent = content ? content.replace(/\n/g, "<br />") : "";

  return (
    <section className="relative py-36 text-white">
      {background?.url && (
        <Image
          src={background.url}
          alt={title ?? "Background image"} 
          fill
          priority
          className="object-cover brightness-60 -z-10"
        />
      )}

      <h1 className="text-4xl md:text-7xl font-bold mb-12 2xl:mb-24 text-center lg:px-10 ">{title}</h1>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-center lg:text-left">

        {/* Left column */}
        {image?.url && (
          <div className="relative w-full h-full min-h-[400px]">
            <Image
              src={image.url}
              alt={title || "Section image"}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        {/* Right column */}
        <div>
          {content && (
            <div
              className="richtext text-left"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          )}

          {/* Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            {buttonText && buttonURL && (
              <a
                href={buttonURL}
                className="inline-block bg-black text-white px-14 py-4 rounded-xl font-bold hover:text-black hover:bg-[#36a9b6] transition-colors duration-400"
              >
                {buttonText}
              </a>
            )}

            {buttonText2 && buttonURL2 && (
              <a
                href={buttonURL2}
                className="inline-block bg-[#48bdcb] text-black px-10 py-4 rounded-xl font-bold hover:bg-[#89e9f5] transition-colors duration-300"
              >
                {buttonText2}
              </a>
            )}

            
          </div>
        </div>
      </div>
    </section>
  );
}
