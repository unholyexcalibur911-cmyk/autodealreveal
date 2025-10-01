"use client";

import Image from "next/image";
import {useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BrandsLogosProps {
    title: string;
    image?: { url: string };
}

export default function BrandsLogos(
    { 
        title,
        image
    }: BrandsLogosProps) {
    const brands = [
        { name: "Acura", url: "/brands/acura.png" },
        { name: "Alfa Romeo", url: "/brands/alfa-romeo.png" },
        { name: "Audi", url: "/brands/audi.png" },
        { name: "BMW", url: "/brands/bmw.png" },
        { name: "Buick", url: "/brands/buick.png" },
        { name: "Cadillac", url: "/brands/cadillac.png" },
        { name: "Chevrolet", url: "/brands/chevrolet.png" },
        { name: "Chrysler", url: "/brands/chrysler.png" },
        { name: "Dodge", url: "/brands/dodge.png" },
        { name: "Fiat", url: "/brands/fiat.png" },
        { name: "Ford", url: "/brands/ford.png" },
        { name: "Genesis", url: "/brands/genesis.png" },
        { name: "GMC", url: "/brands/gmc.png" },
        { name: "Honda", url: "/brands/honda.png" },
        { name: "Hyundai", url: "/brands/hyundai.png" },
        { name: "Infiniti", url: "/brands/infiniti.png" },
        { name: "Jaguar", url: "/brands/jaguar.png" },
        { name: "Jeep", url: "/brands/jeep.png" },
        { name: "Kia", url: "/brands/kia.png" },
        { name: "Land Rover", url: "/brands/land-rover.png" },
        { name: "Lexus", url: "/brands/lexus.png" },
        { name: "Maserati", url: "/brands/maserati.png" },
        { name: "Mazda", url: "/brands/mazda.png" },
        { name: "Mercedes", url: "/brands/mercedes.png" },
        { name: "Mini", url: "/brands/mini.png" },
        { name: "Nissan", url: "/brands/nissan.png" },
        { name: "Porsche", url: "/brands/porsche.png" },
        { name: "Subaru", url: "/brands/subaru.png" },
        { name: "Toyota", url: "/brands/toyota.png" },
        { name: "Volkswagen", url: "/brands/volkswagen.png" },
        { name: "Volvo", url: "/brands/volvo.png" },
    ];

    return (
        <section className="py-10 px-4">
            <h2 className="text-3xl font-bold mb-8 text-left">Brands We Support</h2>
            <div className="grid grid-cols-6 gap-y-10 gap-x-8 justify-items-center">
                {brands.map((brand) => (
                    <motion.div
                        key={brand.name}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center h-20 w-28"
                    >
                        <Image
                            src={brand.url}
                            alt={brand.name}
                            width={80}
                            height={80}
                            className="object-contain grayscale hover:grayscale-0 transition duration-200"
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}