"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Link from "next/link";

// Initialize emailjs with public key
const initializeEmailJS = () => {
  emailjs.init("ZnKdIvcglCuqM1yxP");
};

export default function ContactUsPage() {
  // Label animation states
  const labelVariants = {
    focused: {
      top: "0px",
      left: "12px",
      fontSize: "0.75rem",
      color: "#6366f1",
      backgroundColor: "#ffffff",
    },
    unfocused: {
      top: "20px",
      left: "16px",
      fontSize: "1rem",
      color: "#aaa",
      backgroundColor: "transparent",
    },
  };

  // Form state with consistent naming
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    phone: "", // Changed from Phone to phone for consistency
  });
  const [smsConsent, setSmsConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Initialize emailjs on component mount
  useEffect(() => {
    initializeEmailJS();
  }, []);

  // Form submission handler with input sanitization
  const handleSubmit = async () => {
    // Basic input sanitization
    const sanitizedForm = {
      fullName: form.fullName.trim().replace(/[<>"'&]/g, ""),
      email: form.email.trim().replace(/[<>"'&]/g, ""),
      subject: form.subject.trim().replace(/[<>"'&]/g, ""),
      message: form.message.trim().replace(/[<>"'&]/g, ""),
      phone: form.phone.trim().replace(/[<>"'&]/g, ""),
    };

    if (!smsConsent) {
      setError("You must agree to the SMS consent to submit the form.");
      return;
    }

    setSending(true);
    setError("");
    setSent(false);

    try {
      await emailjs.send("service_y22dn7p", "template_8odl0pt", {
        full_name: sanitizedForm.fullName,
        from_email: sanitizedForm.email,
        subject: sanitizedForm.subject,
        message: sanitizedForm.message,
        phone: sanitizedForm.phone,
        sms_consent: smsConsent,
      });
      setSent(true);
      // Reset all form fields including phone
      setForm({
        fullName: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
      });
      setSmsConsent(false);
    } catch (error) {
      setError("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-amber-50">
      <h1 className="text-4xl font-bold mb-4 text-black">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-6">
        We&apos;d love to hear from you! Please fill out the form below.
      </p>

      <div className="w-full max-w-4xl px-8 py-10 rounded-lg shadow-xl text-center bg-white">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-stone-900">
            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                value={form.fullName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fullName: e.target.value }))
                }
                className="w-full border-b-2 border-gray-300 bg-transparent px-4 pt-6 pb-3 focus:outline-none focus:border-blue-600"
              />
              <motion.span
                initial="unfocused"
                animate={form.fullName ? "focused" : "unfocused"}
                variants={labelVariants}
                style={{
                  position: "absolute",
                  pointerEvents: "none",
                }}
              >
                Full Name
              </motion.span>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className="w-full border-b-2 border-gray-300 bg-transparent px-4 pt-6 pb-3 focus:outline-none focus:border-blue-600"
              />
              <motion.span
                initial="unfocused"
                animate={form.email ? "focused" : "unfocused"}
                variants={labelVariants}
                style={{
                  position: "absolute",
                  pointerEvents: "none",
                }}
              >
                Email
              </motion.span>
            </div>

            {/* Subject */}
            <div className="md:col-span-2 relative">
              <motion.span
                initial="unfocused"
                animate={form.subject ? "focused" : "unfocused"}
                variants={labelVariants}
                style={{
                  position: "absolute",
                  pointerEvents: "none",
                }}
              >
                Subject
              </motion.span>
              <input
                type="text"
                value={form.subject}
                onChange={(e) =>
                  setForm((f) => ({ ...f, subject: e.target.value }))
                }
                className="w-full border-b-2 border-gray-300 bg-transparent px-4 pt-6 pb-3 focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Phone */}
            <div className="relative md:col-span-2 ">
              <input
                type="phone"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="w-full border-b-2 border-gray-300 bg-transparent px-4 pt-6 pb-3 focus:outline-none focus:border-blue-600"
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

            {/* Message */}
            <div className="md:col-span-2 relative">
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="w-full border-b-2 border-gray-300 bg-transparent px-4 pt-6 pb-3 focus:outline-none focus:border-blue-600 resize-none"
              />
              <motion.span
                initial="unfocused"
                animate={form.message ? "focused" : "unfocused"}
                variants={labelVariants}
                style={{
                  position: "absolute",
                  pointerEvents: "none",
                }}
              >
                Message
              </motion.span>
            </div>

            {/* SMS Consent Checkbox */}
            <div className="md:col-span-2 text-left">
              <label className="flex items-center space-x-2 text-stone-900">
                <input
                  type="checkbox"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                  required
                />
                <span className="text-sm">
                  I agree to receive SMS messages related to one-time passcodes
                  (OTP) for my account. Message frequency may vary. Reply
                  &apos;HELP&apos; for assistance or &apos;STOP&apos; to
                  unsubscribe. Standard message and data rates may apply. My
                  information will be handled in accordance with the{" "}
                  <Link
                    target="_blank"
                    href="/privacy-policy"
                    className="text-blue-400 hover:text-blue-300 underline transition duration-200"
                  >
                    Privacy Policy.
                  </Link>
                </span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full max-w-xs rounded-2xl bg-[#115596] py-3 font-semibold text-white hover:bg-[#6366f1] transition-all cursor-pointer disabled:opacity-50"
            disabled={sending}
          >
            {sending ? "Sending..." : "Submit Contact Form"}
          </button>

          {sent && (
            <div className="text-green-600 mt-2">
              Contact form sent successfully!
            </div>
          )}
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </form>
      </div>
    </main>
  );
}
