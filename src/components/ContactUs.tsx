"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";

import { motion } from "framer-motion";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
const ContactUs: React.FC = () => {
  const [nonMarketingAgreed, setNonMarketingAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false); // State for Privacy Policy modal

  // Framer Motion label animation variants
  const labelVariants = {
    focused: {
      top: "0px",
      left: "0.75rem",
      fontSize: "0.75rem",
      color: "#2563eb",
      backgroundColor: "#ffffff",
      padding: "0 0.25rem",
      translateY: "0%",
      transition: { duration: 0.2 },
    },
    unfocused: {
      top: "50%",
      left: "1rem",
      fontSize: "1rem",
      color: "#6b7280",
      backgroundColor: "rgba(0,0,0,0)",
      padding: "0",
      translateY: "-50%",
      transition: { duration: 0.2 },
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
    <>
      <section className="bg-none w-auto max-w-5xl mx-auto px-4 sm:px-8 md:px-16 py-8 sm:py-12 md:py-20 ">
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-black mb-6 sm:mb-8 -mt-4 sm:-mt-8 text-center font-bold">
          Why Wait?
        </h1>
        <div className="mb-6 sm:mb-8 text-center">
          <span className="text-base sm:text-lg md:text-xl font-medium text-[rgb(98,101,131)] block">
            Sign up for early alerts and be the first to unlock launch-day perks, like VIP deal previews and bonus incentives. Whether you're eyeing a sleek sedan or a rugged SUV, Auto Deal Reveal has your next ride covered.
          </span>
        </div>
        <div className="text-center my-4 whitespace-nowrap">
          <p className="leading-[1.5]">
            <span className="font-bold text-[19px] sm:text-[24px] text-[rgb(19,16,34)] whitespace-nowrap"> Launching Soon </span>
            <span className="text-[19px] sm:text-[24px] text-[rgb(19,16,34)] whitespace-nowrap"> – Stay Tuned!</span>
          </p>
        </div>
      <br /><br />
      <hr className="border-t-2 border-gray-400 my-6 w-full" />
      <br /><br />
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-black mb-6 sm:mb-8 -mt-4 sm:-mt-8 text-left font-bold">
          [Subscribe Now]
        </h1>
        <form
          className="space-y-8 sm:space-y-10"
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
                  non_marketing_consent: nonMarketingAgreed,
                  marketing_consent: marketingAgreed,
                },
                "ZnKdIvcglCuqM1yxP"
              );
              setSent(true);
              setForm({
                fullName: "",
                email: "",
                dealership: "",
                phone: "",
                referral: "",
                otherReferral: "",
              });
              setNonMarketingAgreed(false);
              setMarketingAgreed(false);
            } catch {
              setError("Failed to send. Please try again.");
            }
            setSending(false);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 sm:gap-10 md:gap-12 text-stone-900">
            <div className="relative text-center">
              <input
                type="text"
                value={form.fullName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fullName: e.target.value }))
                }
                className="w-full border-b-2 border-gray-300 bg-transparent px-3 sm:px-4 pt-5 sm:pt-6 pb-2 sm:pb-3 focus:outline-none focus:border-blue-600 text-base sm:text-lg"
              />
              <motion.span
                initial="unfocused"
                animate={form.fullName ? "focused" : "unfocused"}
                variants={labelVariants}
                style={{ position: "absolute", pointerEvents: "none" }}
                className="font-medium rounded absolute pointer-events-none px-1 py-0 bg-white text-xs sm:text-sm"
              >
                Full Name
              </motion.span>
            </div>
            <div className="relative">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="w-full border-b-2 border-gray-300 bg-transparent px-3 sm:px-4 pt-5 sm:pt-6 pb-2 sm:pb-3 focus:outline-none focus:border-blue-600 text-base sm:text-lg"
              />
              <motion.span
                initial="unfocused"
                animate={form.phone ? "focused" : "unfocused"}
                variants={labelVariants}
                style={{ position: "absolute", pointerEvents: "none" }}
                className="font-medium rounded absolute pointer-events-none px-1 py-0 bg-white text-xs sm:text-sm"
              >
                Phone Number
              </motion.span>
            </div>
            <div className="relative">
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className="w-full border-b-2 border-gray-300 bg-transparent px-3 sm:px-4 pt-5 sm:pt-6 pb-2 sm:pb-3 focus:outline-none focus:border-blue-600 text-base sm:text-lg"
              />
              <motion.span
                initial="unfocused"
                animate={form.email ? "focused" : "unfocused"}
                variants={labelVariants}
                style={{ position: "absolute", pointerEvents: "none" }}
                className="font-medium rounded absolute pointer-events-none px-1 py-0 bg-white text-xs sm:text-sm"
              >
                Email
              </motion.span>
            </div>
          </div>
          <div className="flex flex-col space-y-4 mt-6">
            <div className="flex items-start">
              <input
                type="checkbox"
                required
                id="non-marketing-agree"
                checked={nonMarketingAgreed}
                onChange={() => setNonMarketingAgreed(!nonMarketingAgreed)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1
                  transition duration-200 ease-in-out
                  hover:border-blue-400
                  checked:bg-blue-600 checked:border-transparent
                  focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
              />
              <label
                htmlFor="non-marketing-agree"
                className="ml-3 block text-sm text-black leading-6"
              >
                I agree to receive non-marketing SMS messages related to
                customer care, product troubleshooting, service updates,
                reminders, notifications, appointment confirmations, and
                follow-ups. Message frequency may vary.{" "}
                {"Reply 'HELP' for assistance or 'STOP' to unsubscribe."}
                Standard message and data rates may apply. My information will
                be handled in accordance with the{" "}
                <a
                  target="_blank"
                  href="/privacy-policy"
                  className="text-blue-400 hover:text-blue-300 underline transition duration-200"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="marketing-agree"
                required
                checked={marketingAgreed}
                onChange={() => setMarketingAgreed(!marketingAgreed)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1
                  transition duration-200 ease-in-out
                  hover:border-blue-400
                  checked:bg-blue-600 checked:border-transparent
                  focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
              />
              <label
                htmlFor="marketing-agree"
                className="ml-3 block text-sm text-black leading-6"
              >
                I agree to receive marketing SMS messages related to promotional
                offers. Message frequency may vary.{" "}
                {"Reply 'HELP' for assistance or 'STOP' to unsubscribe."} to
                unsubscribe. Standard message and data rates may apply. My
                information will be handled in accordance with the{" "}
                <a
                  target="_blank"
                  href="/privacy-policy"
                  className="text-blue-400 hover:text-blue-300 underline transition duration-200"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              title={
                !nonMarketingAgreed && !marketingAgreed
                  ? "Please agree to at least one checkbox"
                  : ""
              }
              className="w-full sm:w-48 rounded-2xl bg-none border-[#115596] border-2 py-3 font-semibold text-[#115596]
          hover:bg-[#115596] transition duration-200 mt-6
          disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={sending || (!nonMarketingAgreed && !marketingAgreed)}
            >
              {sending ? "Requesting..." : "Send Form"}
            </button>
          </div>

          {sent && <div className="text-green-400 mt-2">Message sent!</div>}
          {error && <div className="text-red-400 mt-2">{error}</div>}
        </form>
      </section>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </>
  );
};

export default ContactUs;

