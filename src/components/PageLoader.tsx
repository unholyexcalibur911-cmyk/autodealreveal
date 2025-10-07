"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set a timer to hide the loader after a few seconds
        const timer = setTimeout(() => setLoading(false), 2000); // 3-second duration
        return () => clearTimeout(timer);
    }, []);

    // If not loading, render nothing
    if (!loading) {
        return null;
    }

    // Render the loader overlay
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-200 bg-opacity-80">
            {/* Container for the spinners to center them */}
                <div className="relative flex h-28 w-28 items-center justify-center">
        
            {/* Outer Dashed Circle (SVG) - Rotates Counter-Clockwise */}
                <div className="absolute h-full w-full animate-reverse-spin">
                    <svg viewBox="0 0 100 100" className="h-full w-full">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="transparent"
                            strokeWidth="5"
                            strokeDasharray="15 10" // Creates the dashed effect
                            className="text-[#2b2d42] opacity-50"
                        />
                    </svg>
                </div>

            {/* Inner Solid Arc - Rotates Clockwise */}
            <div className="absolute h-20 w-20 rounded-full border-4 border-solid border-t-transparent border-r-[#2b2d42] border-b-transparent border-l-[#2b2d42] animate-spin"></div>

            </div>
        </div>
    );
}