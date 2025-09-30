"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

interface Section1Props {
  title: string;
  subtitle?: string;
  content?: string; // rich text from Strapi
  image?: { url: string };
  background?: { url: string };
  buttonText?: string;
  buttonURL?: string;
  buttonText2?: string;
  buttonURL2?: string;
}

export default function Section1({
  title,
  subtitle,
  content,
  image,
  background,
  buttonText,
  buttonURL,
  buttonText2,
  buttonURL2,
}: Section1Props) {
  const formattedContent = content ? content.replace(/\n/g, "<br />") : "";

  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-16 2xl:py-42 text-stone-100 " ref={sectionRef}>
      {background?.url && (
        <Image
          src={background.url}
          alt={title || "Section image"}
          fill
          priority
          className="object-cover -z-10 brightness-60"
        />
      )}

      <h1 className="text-5xl md:text-6xl font-bold mb-12 2xl:mb-24 text-center lg:px-10">{title}</h1>
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-center lg:text-left">
        {/* Left column - Text slide in from left */}
        <div className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
          {content && (
            <div
              className="richtext 2xl:text-left"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          )}

          {/* Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-6">
            {buttonText && buttonURL && (
              <a
                href={buttonURL}
                className="inline-block bg-[#084d8c]/60 text-stone-300 px-12 py-4 rounded-2xl font-bold hover:text-white hover:bg-[#084d8c] transition-colors duration-400 shadow-xl/40 md:text-lg border-3 border-[#084d8c] "
              >
                {buttonText}
              </a>
            )}

            {buttonText2 && buttonURL2 && (
              <a
                href={buttonURL2}
                className="inline-block bg-[#084d8c]/60 text-stone-300 px-12 py-4 rounded-2xl font-bold hover:bg-[#084d8c] hover:text-white transition-colors duration-400 shadow-xl/40 md:text-lg border-3 border-[#084d8c] "
              >
                {buttonText2}
              </a>
            )}
          </div>
        </div>

        {/* Right column - Image slide in from right */}
        {image?.url && (
          <div className={`relative w-full h-full min-h-[400px] transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16 md:translate-x-16'}`}>
            <Image
              src={image.url}
              alt={title || "Section image"}
              fill
              className="object-cover rounded-lg "
            />
          </div>
        )}
      </div>
    </section>
  );
}
