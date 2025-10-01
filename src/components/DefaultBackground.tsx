import React from "react";

// This is a simple default background component
export default function DefaultBackground() {
    return (
        <video
            autoPlay
            loop
            muted
            playsInline
            src="/MovingBg.mp4"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: -1,
                opacity: 0.7,
            }}
        />
    );
}
