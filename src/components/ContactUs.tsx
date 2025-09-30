"use client";

import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const ContactUs: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
        subscribe: false,
    });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <button
                className="fixed bottom-8 right-8 z-50 bg-[#115596] border text-white flex items-center gap-2 px-4 py-3 rounded-full shadow-lg hover:bg-red-600 hover:font-bold hover:text-black transition-all group"
                onClick={() => setOpen(true)}
                aria-label="Contact Us"
            >
                {/* Phone Icon SVG from /ContactUs.svg */}
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-8">
                    <path d="M3.51089 2L7.15002 2.13169C7.91653 2.15942 8.59676 2.64346 8.89053 3.3702L9.96656 6.03213C10.217 6.65159 10.1496 7.35837 9.78693 7.91634L8.40831 10.0375C9.22454 11.2096 11.4447 13.9558 13.7955 15.5633L15.5484 14.4845C15.9939 14.2103 16.5273 14.1289 17.0314 14.2581L20.5161 15.1517C21.4429 15.3894 22.0674 16.2782 21.9942 17.2552L21.7705 20.2385C21.6919 21.2854 20.8351 22.1069 19.818 21.9887C6.39245 20.4276 -1.48056 1.99997 3.51089 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {/* Contact Us text only on hover */}
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:pl-2 transition-all duration-300 ease-in-out whitespace-nowrap">Contact Us</span>
            </button>
            {mounted && open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
                    <div className="relative bg-[#2b2d42] w-full max-w-2xl px-8 py-10 rounded-lg shadow-xl text-center">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                            onClick={() => setOpen(false)}
                            aria-label="Close"
                        >
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <h1 className="text-4xl text-gray-300 mb-2">Contact Us</h1>
                        <div className="w-12 h-0.5 bg-gray-600 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-200 mb-8">Drop us a line!</p>
                        <form
                            className="space-y-6"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                setSending(true);
                                setError("");
                                setSent(false);
                                try {
                                    await emailjs.send(
                                        "service_y22dn7p", // <-- EmailJs service ID temp
                                        "template_8odl0pt", // <-- EmailJs template ID temp
                                        {
                                            from_name: form.name,
                                            from_email: form.email,
                                            message: form.message,
                                            subscribe: form.subscribe ? "Yes" : "No",
                                        },
                                        "ZnKdIvcglCuqM1yxP" // <-- EmailJs public key temp
                                    );
                                    setSent(true);
                                    setForm({ name: "", email: "", message: "", subscribe: false });
                                } catch (err) {
                                    setError("Failed to send. Please try again.");
                                }
                                setSending(false);
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Name"
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                className="w-full rounded border border-gray-500 bg-stone-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            <input
                                type="email"
                                placeholder="Email*"
                                required
                                value={form.email}
                                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                className="w-full rounded border border-gray-500 bg-stone-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            <textarea
                                rows={5}
                                placeholder="Message"
                                value={form.message}
                                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                className="w-full rounded border border-gray-500 bg-stone-200 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                            ></textarea>
                            <div className="flex items-center space-x-2 text-gray-300">
                                <input
                                    id="subscribe"
                                    type="checkbox"
                                    checked={form.subscribe}
                                    onChange={e => setForm(f => ({ ...f, subscribe: e.target.checked }))}
                                    className="h-4 w-4 rounded border-gray-500 bg-black focus:ring-gray-400"
                                />
                                <label htmlFor="subscribe" className="text-sm">
                                    Sign up for our email list for updates, promotions, and more.
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-32 rounded bg-white py-3 font-semibold text-black hover:bg-gray-200"
                                disabled={sending}
                            >
                                {sending ? "SENDING..." : "SEND"}
                            </button>
                            {sent && <div className="text-green-400 mt-2">Message sent!</div>}
                            {error && <div className="text-red-400 mt-2">{error}</div>}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactUs;
