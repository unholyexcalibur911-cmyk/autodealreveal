"use client";

import Image from "next/image";

interface HeroProps {
  title: string;
  subtitle: string;
  background?: { url: string };
  buttonText?: string;
  buttonURL?: string;
}

export default function Hero({
  title,
  subtitle,
  background,
  buttonText,
  buttonURL,
}: HeroProps) {
  return (
    <section className="relative h-screen w-full text-stone-300">
      {/* Background Image */}
      {background?.url && (
        <Image
          src={background.url}
          alt={title}
          fill
          priority
          quality={100}
          className="object-cover"
        />
      )}

      {/* Content at the bottom of the image */}
      <div className="absolute bottom-0 2xl:bottom-14 left-1/2 transform -translate-x-1/2 w-full px-6 py-12 text-center z-10">
        <h1 className="text-4xl md:text-6xl 2xl:text-7xl font-bold mb-4 text-shadow-lg max-w-3xl lg:max-w-4xl text-center mx-auto">{title}</h1>

        {subtitle && (
          <p className="text-lg md:text-3xl mb-6 text-shadow-xl max-w-4xl mx-auto">{subtitle}</p>
        )}

        {buttonText && buttonURL && (
          <a
            href={buttonURL}
            className="inline-block bg-black text-white px-12 py-4 rounded-xl font-bold hover:text-black hover:bg-[#36a9b6] transition-colors duration-400 shadow-xl/40 md:text-lg"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
}
