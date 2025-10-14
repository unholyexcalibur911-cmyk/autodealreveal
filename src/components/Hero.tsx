"use client";

import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  background?: { url: string };
  buttonText?: string;
  buttonURL?: string;
  buttonText_2?: string;
  buttonURL_2?: string;
}

export default function Hero({
  title,
  subtitle,
  background,
  buttonText,
  buttonURL,
  buttonText_2,
  buttonURL_2,
}: HeroProps) {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center text-stone-100">
      {/* Background Image */}
      {background?.url && (
        <Image
          src={background.url}
          alt={title}
          fill
          priority
          quality={90}
          className="object-cover brightness-75"
        />
      )}

      {/* Content Container */}
      <div className="absolute z-10 w-full px-4 text-center sm:px-6 lg:px-8">
        {/* Gradient Overlay */}
        <div className="absolute inset-0" />

        {/* Content */}
        <div className="relative mx-auto max-w-5xl">
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-center">
            {title}
          </h1>

          {subtitle && (
            <p className="mb-6 text-base sm:text-lg md:text-xl lg:text-2xl text-center">
              {subtitle}
            </p>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center">
            {buttonText && buttonURL && (
              <Link
                href={buttonURL}
                className="inline-block rounded-2xl border-2 border-indigo-500 bg-indigo-500/70 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-500 sm:px-8 sm:text-base"
              >
                {buttonText}
              </Link>
            )}
            {buttonText_2 && buttonURL_2 && (
              <Link
                href={buttonURL_2}
                className="inline-block rounded-2xl border-2 border-indigo-500 bg-indigo-500/30 px-6 py-3 text-sm font-semibold text-stone-100 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-500 hover:text-white sm:px-8 sm:text-base"
              >
                {buttonText_2}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
