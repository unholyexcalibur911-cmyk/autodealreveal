"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

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
    <section className="relative py-36 text-white" ref={sectionRef}>
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

        {/* Left column - Image slide in from left */}
        {image?.url && (
          <div className={`relative w-full h-full min-h-[400px] transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
            <Image
              src={image.url}
              alt={title || "Section image"}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        {/* Right column - Text slide in from right */}
        <div className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
          {content && (
            <div
              className="richtext text-left"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          )}

          {/* Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start pt-6 gap-8">
            {buttonText && buttonURL && (
              <a
                href={buttonURL}
                className="inline-block bg-[#084d8c]/60 text-stone-300 px-12 py-4 rounded-2xl font-bold hover:text-white hover:bg-[#084d8c] transition-colors duration-400 shadow-xl/40 md:text-lg"
              >
                {buttonText}
              </a>
            )}

            {buttonText2 && buttonURL2 && (
              <a
                href={buttonURL2}
                className="inline-block bg-[#084d8c]/60 text-stone-300 px-12 py-4 rounded-2xl font-bold hover:bg-[#084d8c] hover:text-white transition-colors duration-400 shadow-xl/40 md:text-lg border border-black"
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
