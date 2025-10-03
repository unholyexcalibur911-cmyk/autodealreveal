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
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
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
    }
  }, []);

  return (
    <section className="relative py-36 bg-stone-300/40 text-white" ref={sectionRef}>
      {background?.url && (
        <Image
          src={background.url}
          alt={title ?? "Background image"} 
          fill
          priority
          className="object-cover brightness-80 -z-10"
        />
      )}

  <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 text-stone-900 md:grid-cols-2 gap-10 items-center text-center lg:text-left">
        {/* Left column - Image slide in from left */}
        {image?.url && mounted && (
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
        {mounted ? (
          <div className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
            <h1 className="text-3xl md:text-3xl font-bold mb-6 2xl:mb-12 text-left text-stone-900">{title}</h1>
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
                  className="inline-block bg-[#084d8c]/0 text-stone-950 px-12 py-4 rounded-2xl font-bold hover:text-white hover:bg-[#084d8c] transition-colors duration-400 shadow-xl/40 md:text-lg border-2 border-[#084d8c]"
                >
                  {buttonText}
                </a>
              )}
              {buttonText2 && buttonURL2 && (
                <a
                  href={buttonURL2}
                  className="inline-block bg-[#084d8c]/0 text-stone-950 px-12 py-4 rounded-2xl font-bold hover:bg-[#084d8c] hover:text-white transition-colors duration-400 shadow-xl/40 md:text-lg border-2 border-[#084d8c]"
                >
                  {buttonText2}
                </a>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl md:text-3xl font-bold mb-6 2xl:mb-12 text-left text-stone-900">{title}</h1>
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
                  className="inline-block bg-[#084d8c]/0 text-stone-950 px-12 py-4 rounded-2xl font-bold hover:text-white hover:bg-[#084d8c] transition-colors duration-400 shadow-xl/40 md:text-lg border-2 border-[#084d8c]"
                >
                  {buttonText}
                </a>
              )}
              {buttonText2 && buttonURL2 && (
                <a
                  href={buttonURL2}
                  className="inline-block bg-[#084d8c]/0 text-stone-950 px-12 py-4 rounded-2xl font-bold hover:bg-[#084d8c] hover:text-white transition-colors duration-400 shadow-xl/40 md:text-lg border-2 border-[#084d8c]"
                >
                  {buttonText2}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
