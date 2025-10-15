"use client";

import React from "react";

import Link from "next/link";

const Support: React.FC = () => {
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
