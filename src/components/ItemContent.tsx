"use client";

import Image from "next/image";

interface ItemContentProps {
  id: number;
  title: string;
  description: string;
  icon?: { url: string };
  buttonText?: string;
  buttonURL?: string;
  background?: { url: string };
}

export default function ItemContent({
  title,
  description,
  icon,
  buttonText,
  buttonURL,
  background,
}: ItemContentProps) {
  return (
    <div
      className="relative p-6 rounded-2xl text-gray-800 w-full flex flex-col justify-between bg-stone-100"
      style={{
        backgroundImage: background?.url ? `url(${background.url})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content */}
      <div className="relative z-10 min-h-[400px] flex flex-col justify-start">
        {/* Title at the top */}
        <h3 className="text-2xl font-bold mb-6 text-center pt-2">{title}</h3>

        {/* Icon */}
        {icon?.url && (
          <div className="mb-4">
            <Image
              src={icon.url}
              alt={title}
              width={70}
              height={70}
              className="mx-auto invert my-6"
            />
          </div>
        )}

        {/* Description */}
        <div
          className="richtext text-justify justify-center text-sm mb-4 "
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      {/* Button */}
      {buttonText && buttonURL && (
        <div className="relative z-10 text-center mt-4">
          <a
            href={buttonURL}
              className="inline-block bg-[#2b2d42] text-neutral-100 px-8 py-3 rounded-xl font-bold hover:text-white hover:bg-rose-600 transition-colors duration-300 shadow-xl/40"
          >
            {buttonText}
          </a>
        </div>
      )}
    </div>
  );
}
