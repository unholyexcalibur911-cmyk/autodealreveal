"use client";

import React, { useState } from "react";

export default function ContactUs() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className="fixed bottom-8 right-8 z-50 bg-[#2b2d42] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#1a1b2e] transition-all"
                onClick={() => setOpen(true)}
            >
                Contact Us
            </button>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 bg-opacity-50">
                    <div className="relative bg-[#2b2d42] w-full max-w-2xl px-8 py-10 rounded-lg shadow-xl text-center">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                            onClick={() => setOpen(false)}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <h1 className="text-4xl text-gray-300 mb-2">Contact Us</h1>
                        <div className="w-12 h-0.5 bg-gray-600 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-200 mb-8">Drop us a line!</p>
                        <form className="space-y-6">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full rounded border border-gray-500 bg-stone-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            <input
                                type="email"
                                placeholder="Email*"
                                required
                                className="w-full rounded border border-gray-500 bg-stone-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            <textarea
                                rows={5}
                                placeholder="Message"
                                className="w-full rounded border border-gray-500 bg-stone-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                            ></textarea>
                            <div className="flex items-center space-x-2 text-gray-300">
                                <input
                                    id="subscribe"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-500 bg-black focus:ring-gray-400"
                                />
                                <label htmlFor="subscribe" className="text-sm">
                                    Sign up for our email list for updates, promotions, and more.
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-32 rounded bg-white py-3 font-semibold text-black hover:bg-gray-200"
                            >
                                SEND
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
