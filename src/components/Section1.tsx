"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface Section1Props {
  title: string;
  subtitle?: string;
  content?: string; // markdown text from Strapi
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
    <section
      className="relative py-16 2xl:py-42 bg-stone-100/40 text-stone-100"
      ref={sectionRef}
    >
      {/* Background image */}
      {background?.url && (
        <Image
          src={background.url}
          alt={title || "Section image"}
          fill
          priority
          className="object-cover -z-10 brightness-80"
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center text-center lg:text-left">
        {/* Left column - Text */}
        <div
          className={`transition-all duration-700 text-stone-900 ease-out ${
            visible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-4 md:-translate-x-16"
          }`}
        >
          <h1 className="text-3xl md:text-3xl text-stone-900 font-bold mb-6 2xl:mb-12 text-left">
            {title}
          </h1>

          {/* Markdown content */}
          {content && (
            <div className="richtext 2xl:text-left prose prose-stone max-w-none text-stone-800">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-6">
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

        {/* Right column - Image */}
        {image?.url && (
          <div
            className={`relative flex items-center justify-center w-full h-full min-h-[200px] md:min-h-[400px] transition-all duration-700 ease-out rounded-lg ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4 md:translate-x-16"
            }`}
          >
            <Image
              src={image.url}
              alt={title || "Section image"}
              fill
              className="object-contain rounded-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}
