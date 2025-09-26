"use client";

import Image from "next/image";

interface ImageCarouselProps {
    title?: string;
    images: { url: string; alt?: string }[];
}

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
    return (
        <div className="w-full">
            {title && (
                <h2 className="text-3xl font-semibold mb-4 text-center">{title}</h2>
            )}
            <div className="overflow-x-auto snap-x">
                <div className="flex">
                    {images.map((image, index) => (
                        <div key={index} className="min-w-[300px] snap-center">
                            <Image
                                src={image.url}
                                alt={image.alt || `Image ${index + 1}`}
                                width={300}
                                height={300}
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}