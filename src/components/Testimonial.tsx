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
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '2rem 0' }}>
            <div style={{ flex: '0 0 120px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {image?.url ? (
                    <Image
                        src={image.url}
                        alt={name + " profile"}
                        width={100}
                        height={100}
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                ) : (
                    <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                        {name.charAt(0)}
                    </div>
                )}
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <strong>{name}</strong>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>{role}</div>
                </div>
            </div>
            <div style={{ flex: 1, background: '#f9f9f9', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <blockquote style={{ margin: 0, fontStyle: 'italic', color: '#333' }}>
                    “{quote}”
                </blockquote>
            </div>
        </div>
    );
}