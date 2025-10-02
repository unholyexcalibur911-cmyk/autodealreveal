"use client";

import Image from "next/image";
import {useEffect, useState } from "react";

interface TestimonialProps {
    name: string;
    role: string;
    image?: { url: string };
    quote: string;
}

export default function Testimonial(
    { 
        name, 
        role, 
        image, 
        quote 
    }: TestimonialProps) {
    return (
        <div className="flex items-center gap-8 py-8">
            <div className="flex flex-col items-center shrink-0 w-[120px]">
                {image?.url ? (
                    <Image
                        src={image.url}
                        alt={name + " profile"}
                        width={100}
                        height={100}
                        className="rounded-full object-cover"
                    />
                ) : (
                    <div className="w-[100px] h-[100px] rounded-full bg-gray-200 flex items-center justify-center text-4xl">
                        {name.charAt(0)}
                    </div>
                )}
                <div className="mt-4 text-center">
                    <strong>{name}</strong>
                    <div className="text-sm text-gray-500">{role}</div>
                </div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg p-6 shadow-md">
                <blockquote className="m-0 italic text-gray-800">
                    “{quote}”
                </blockquote>
            </div>
        </div>
    );
}