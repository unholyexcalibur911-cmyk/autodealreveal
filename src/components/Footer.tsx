import Link from "next/link";
import Image from "next/image";
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";

export default function Footer() {
    return (
        <>
            <footer className="bg-[#2b2d42] text-white text-shadow-lg pb-5">
                {/* Top Section */}
                <div className=" px-6 md:px-18 max-w-6xl mx-auto py-15 grid gap-10 sm:grid-cols-3 text-center md:text-left">
                    {/* 1st Column */}
                    <div className="space-y-3">
                        <h1 className="font-bold text-lg leading-snug">
                        Contact us today for a custom <br />
                        consultation.
                        </h1>
                            {/* Contact number */}
                            <div className="text-[#48bdcb] text-lg"></div>

                            {/* Social Icons */}
                            <div className="flex justify-center md:justify-start gap-4 mt-4 text-3xl">
                                <Link
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-[#48bdcb] transition-colors"
                                >
                                <FaFacebookSquare />
                                </Link>
                                <Link
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-[#48bdcb] transition-colors"
                                >
                                <FaInstagramSquare />
                                </Link>
                                <Link
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-[#48bdcb] transition-colors"
                                >
                                <FaLinkedin />
                                </Link>
                                <Link
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-[#48bdcb] transition-colors"
                                >
                                <FaTwitterSquare />
                            </Link>
                            </div>

                            <button className="bg-[#36b1bf] px-8 py-4 font-bold mt-6 hover:text-black transition-colors duration-300 ease-in-out">
                            EMAIL US
                            </button>
                        </div>

          {/* 2nd Column */}
            <div className="flex flex-col space-y-3">
            <Link
                href="/"
                className="text-lg text-[#1badbe] hover:text-white transition-colors duration-300 ease-in-out"
                >Home
            </Link>
            <Link
                href="/about-us"
                className="text-lg text-[#1badbe] hover:text-white transition-colors duration-300 ease-in-out"
                >About
            </Link>
            <Link
                href="/inventory"
                className="text-lg text-[#1badbe] hover:text-white transition-colors duration-300 ease-in-out"
                >Inventory
            </Link>
            <Link
                href="/products"
                className="text-lg text-[#1badbe] hover:text-white transition-colors duration-300 ease-in-out"
                >Products
            </Link>
            </div>

            {/* 3rd Column */}
            <div>
                <Image
                src="/logo.png"
                alt="Auto Deal Reveal Logo"
                width={160}
                height={80}
                className="h-13 w-auto mx-auto md:mx-0"
                priority
                />
                <div className="mt-12 space-y-2 text-lg">
                <div className="text-noShadow font-bold">Auto Deal Reveal, Inc.</div>
                {/* Location/Address */}
                <div className="font-light"></div> 
                <div className="font-light"></div>
                </div>
            </div>
            </div>

        {/* Bottom Section */}
        <div className="px-12">
            <div className="w-full border-t text-center py-6 text-sm leading-relaxed text-noShadow">
                Copyright © 2025 Auto Deal Reveal| All Rights Reserved.
            </div>
        </div>
        </footer>
    </>
    );
}
