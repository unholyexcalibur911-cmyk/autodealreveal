"use client";

import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const ContactUs: React.FC = () => {
    // Framer Motion label animation variants
    const labelVariants = {
        focused: {
            top: "0px",
            left: "12px",
            fontSize: "0.75rem",
            color: "#2563eb",
            backgroundColor: "#2b2d42",
            padding: "0 0.25rem",
        },
        unfocused: {
            top: "50%",
            left: "16px",
            fontSize: "1rem",
            color: "#6b7280",
            backgroundColor: "rgba(0,0,0,0)",
            padding: "0",
            translateY: "-50%",
        },
    };
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        dealership: "",
        phone: "",
        referral: "",
        otherReferral: "",
    });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    return (
        <section className="bg-[#2b2d42] w-full mx-auto px-50 py-30 shadow-xl text-center border-b-2 border-[#7777aa]">
            <h1 className="text-4xl text-gray-300 mb-8 -mt-8">Contact Us</h1>
            <form
                className="space-y-15"
                onSubmit={async (e) => {
                    e.preventDefault();
                    setSending(true);
                    setError("");
                    setSent(false);
                    try {
                        await emailjs.send(
                            "service_y22dn7p",
                            "template_8odl0pt",
                            {
                                full_name: form.fullName,
                                from_email: form.email,
                                dealership: form.dealership,
                                phone: form.phone,
                                referral: form.referral,
                                otherReferral: form.otherReferral,
                            },
                            "ZnKdIvcglCuqM1yxP"
                        );
                        setSent(true);
                        setForm({ fullName: "", email: "", dealership: "", phone: "", referral: "", otherReferral: "" });
                    } catch (err) {
                        setError("Failed to send. Please try again.");
                    }
                    setSending(false);
                }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-stone-100">
                    <div className="relative">
                        <input
                            type="text"
                            value={form.fullName}
                            onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                            className="w-full border-b-2 border-white bg-transparent px-4 pt-6 pb-3 focus:outline-none focus:border-blue-600"
                        />
                        <motion.span
                            initial="unfocused"
                            animate={form.fullName ? "focused" : "unfocused"}
                            variants={labelVariants}
                            style={{ position: "absolute", pointerEvents: "none" }}
                        >
                            Full Name
                        </motion.span>
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            required
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            className="w-full border-b-2 border-white bg-transparent px-4 pt-6 pb-3 focus:outline-none focus:border-blue-600"
                        />
                        <motion.span
                            initial="unfocused"
                            animate={form.email ? "focused" : "unfocused"}
                            variants={labelVariants}
                            style={{ position: "absolute", pointerEvents: "none" }}
                        >
                            Email
                        </motion.span>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            value={form.dealership}
                            onChange={e => setForm(f => ({ ...f, dealership: e.target.value }))}
                            className="w-full border-b-2 border-white bg-transparent px-4 pt-6 pb-3 focus:outline-none focus:border-blue-600"
                        />
                        <motion.span
                            initial="unfocused"
                            animate={form.dealership ? "focused" : "unfocused"}
                            variants={labelVariants}
                            style={{ position: "absolute", pointerEvents: "none" }}
                        >
                            Dealership Name or Group
                        </motion.span>
                    </div>
                    <div className="relative">
                        <input
                            type="tel"
                            value={form.phone}
                            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                            className="w-full border-b-2 border-white bg-transparent px-4 pt-6 pb-3 focus:outline-none focus:border-blue-600"
                        />
                        <motion.span
                            initial="unfocused"
                            animate={form.phone ? "focused" : "unfocused"}
                            variants={labelVariants}
                            style={{ position: "absolute", pointerEvents: "none" }}
                        >
                            Phone Number
                        </motion.span>
                    </div>
                    <div className="md:col-span-2 relative">
                        <motion.span
                            initial="unfocused"
                            animate={form.referral ? "focused" : "unfocused"}
                            variants={labelVariants}
                            style={{ position: "absolute", pointerEvents: "none" }}
                        >
                            How did you hear about us
                        </motion.span>
                        <select
                            id="referral"
                            value={form.referral}
                            onChange={e => setForm(f => ({ ...f, referral: e.target.value }))}
                            className="w-full border-b-2 border-white bg-transparent px-4 pt-6 pb-3 focus:text-white focus:bg-[#2b2d42] focus:outline-none focus:border-blue-600"
                        >
                            <option value=""></option>
                            <option value="Dealer referral">Dealer referral</option>
                            <option value="Trade show">Trade show</option>
                            <option value="OEM">OEM</option>
                            <option value="Social Media">Social Media</option>
                            <option value="Blog">Blog</option>
                            <option value="Search Engine">Search Engine</option>
                            <option value="Other">Other (please specify)</option>
                        </select>
                        {form.referral === "Other" && (
                            <div className="relative mt-2">
                                <input
                                    type="text"
                                    value={form.otherReferral}
                                    onChange={e => setForm(f => ({ ...f, otherReferral: e.target.value }))}
                                    className="w-full border-b-2 border-white bg-transparent px-4 pt-6 pb-3 focus:outline-none focus:border-blue-600"
                                />
                                <motion.span
                                    initial="unfocused"
                                    animate={form.otherReferral ? "focused" : "unfocused"}
                                    variants={labelVariants}
                                    style={{ position: "absolute", pointerEvents: "none" }}
                                >
                                    Please specify
                                </motion.span>
                            </div>
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-42 rounded-2xl rounded bg-[#115596] py-3 font-semibold text-white hover:bg-[#cd2b29]"
                    disabled={sending}
                >
                    {sending ? "Requesting" : "Request a Demo"}
                </button>
                {sent && <div className="text-green-400 mt-2">Message sent!</div>}
                {error && <div className="text-red-400 mt-2">{error}</div>}
            </form>
        </section>
    );
};

export default ContactUs;
