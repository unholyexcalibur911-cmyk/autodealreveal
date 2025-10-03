"use client";

import Image from "next/image";

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
        <section className="relative h-screen w-full text-stone-100">
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

            {/* Top max-w div */}
            <div className="flex flex-col justify-center items-center absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full px-6 py-10 text-center z-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-xl md:text-5xl 2xl:text-6xl text-slate-800 font-bold mb-4">{title}</h1>
                    {subtitle && (
                        <p className="text-lg md:text-xl text-slate-700 mb-6">{subtitle}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                {buttonText && buttonURL && (
                    <a
                        href={buttonURL}
                        className="inline-block bg-[#084d8c]/0 text-[#084d8c] px-12 py-4 rounded-2xl font-bold hover:text-white hover:bg-[#084d8c] transition-colors duration-400 hover:-translate-y-1 ease-in-out shadow-xl/40 md:text-lg border-3 border-[#084d8c]"
                    >
                        {buttonText}
                    </a>
                )}
                {buttonText_2 && buttonURL_2 && (
                    <a
                        href={buttonURL_2}
                        className="inline-block bg-[#084d8c]/60 text-stone-300 px-12 py-4 rounded-2xl font-bold hover:bg-[#084d8c] hover:text-white transition-colors duration-400 shadow-xl/40 md:text-lg border-3 border-[#084d8c]"
                    >
                        {buttonText_2}
                    </a>
                )}
            </div>
        </section>
    );
}
