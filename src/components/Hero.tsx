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
  const isVideo = (url?: string) => {
    if (!url) return false;
    const videoExts = [".mp4", ".webm", ".ogg", ".mov"];
    const lower = url.split("?")[0].toLowerCase();
    return videoExts.some((ext) => lower.endsWith(ext));
  };

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center text-stone-100 cols-2">
      {/* Background Image */}
      {background?.url && isVideo(background.url) ? (
        <video
          className="absolute inset-0 w-full h-full object-cover brightness-75 -z-20"
          src={background.url}
          autoPlay
          muted
          loop
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        background?.url && (
          <Image
            src={background.url}
            alt={title}
            fill
            priority
            quality={90}
            className="object-cover brightness-75"
          />
        )
      )}

      {/* Content Container */}
      <div className="absolute z-10 w-full px-8 sm:px-12 lg:px-20 left-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0" />

        {/* Content (left-aligned to match design) */}
        <div className="relative mx-auto max-w-5xl text-left">
          {/* Split title into prefix and rest (e.g. "Auto Deal Reveal:" + "Unveiling the Future of Car Buying") */}
          {(() => {
            const hasColon = title?.includes(":");
            const prefix = hasColon ? title.split(":", 1)[0] + ":" : null;
            const rest = hasColon ? title.split(":").slice(1).join(":").trim() : title;
            return (
              <>
                {prefix && (
                  <div className="mb-2 text-3xl sm:text-4xl md:text-5xl font-bold lg:text-6xl text-[#6366f1]">
                    {prefix}
                  </div>
                )}
                <h1 className="mb-4 text-3xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-6xl font-bold tracking-tight text-[#0b1220] leading-tight">
                  {rest}
                </h1>
              </>
            );
          })()}

          {/* Subtitle: split into a prominent first sentence and a smaller description */}
          {subtitle && (() => {
            const match = subtitle.match(/^[^.!?]*[!\.?]/);
            const main = match ? match[0].trim() : subtitle;
            const remainder = match ? subtitle.slice(match[0].length).trim() : null;
            return (
              <div className="mb-6">
                {main && (
                  <div className="text-2xl sm:text-3xl font-semibold text-[#6366f1] mb-2">
                    {main}
                  </div>
                )}
                {remainder && (
                  <div className="text-sm sm:text-xl text-gray-300">
                    {remainder}
                  </div>
                )}
              </div>
            );
          })()}

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-start">
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
