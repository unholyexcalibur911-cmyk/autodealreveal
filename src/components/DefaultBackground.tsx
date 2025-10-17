import React from "react";

// This is a simple default background component
export default function DefaultBackground() {
    return (
        <video
            autoPlay
            loop
            muted
            playsInline
            src="/Background.mp4"
            className="absolute inset-0 w-full h-full object-cover -z-10 opacity-2"
        />
    );
}
