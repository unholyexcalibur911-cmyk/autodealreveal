"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import React from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";

const labelVariants = {
  focused: {
    top: "0px",
    left: "12px",
    fontSize: "0.75rem",
    color: "#6366f1 ",
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

const Support: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    issue: "",
    details: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  return (
    <>
      <Link
        className="z-50 bg-[#f5f5f5] border text-[#6366f1] flex items-center gap-2 px-6 py-2 rounded-full shadow-lg hover:bg-[#6366f1] hover:text-white transition-all group"
        href="/contact-us"
      >
        Contact Us
      </Link>
    </>
  );
};

export default Support;
