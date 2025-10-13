"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface Page {
  id: number;
  title: string;
  slug: string;
}

interface ChildPage {
  id: number;
  title: string;
  slug: string;
  page: {
    id: number;
  };
}

export default function Footer() {
  const pathname = usePathname();
  const [pages, setPages] = useState<Page[]>([]);
  const [childPages, setChildPages] = useState<ChildPage[]>([]);
  const [openPageId, setOpenPageId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchPages() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
        const pageRes = await fetch(
          `${baseUrl}/api/pages?populate[Sections][populate]=*`
        ); // Fetch page sections
        const pageData = await pageRes.json();
        const childRes = await fetch(
          `${baseUrl}/api/childpages?populate[page]=true&populate[sections][populate]=*`
        ); // Fetch child page sections
        const childData = await childRes.json();
        const order = ["home", "about-us", "inventory", "products"];
        const sortedPages = [...(pageData.data || [])].sort(
          (a: Page, b: Page) => order.indexOf(a.slug) - order.indexOf(b.slug)
        );
        setPages(sortedPages);
        setChildPages(childData.data || []);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    }
    fetchPages();
  }, []);

  const getChildren = (pageId: number) =>
    childPages.filter((child) => child.page?.id === pageId);

  return (
    <>
      <footer className="bg-[#2b2d42] text-stone-200 text-shadow-lg pb-5">
        {/* Top Section */}
        <div className=" px-6 md:px-18 max-w-6xl mx-auto py-15 grid gap-10 sm:grid-cols-3 text-center md:text-left">
          {/* 1st Column */}
          <div className="space-y-3">
            <h1 className="font-bold text-lg leading-snug">
              Contact us today for a custom <br />
              consultation.
            </h1>
            {/* Contact number */}
            <div className="text-[#cd2b29] text-lg"></div>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-4 mt-4 text-3xl">
              {/* Social media items */}
            </div>

            <button className="bg-[#115596] hover:bg-[#cd2b29] px-8 py-4 font-bold mt-6 hover:text-white transition-colors duration-300 ease-in-out">
              EMAIL US
            </button>
          </div>

          {/* 2nd Column */}
          <div className="flex flex-col space-y-3 text-white ">
            {pages.length === 0
              ? null
              : pages.map((page) => {
                  const children = getChildren(page.id);
                  const isActiveParent =
                    pathname === `/${page.slug}` ||
                    pathname.startsWith(`/${page.slug}/`) ||
                    (page.slug === "home" && pathname === "/");

                  return (
                    <div
                      key={page.id}
                      className="relative"
                      onMouseEnter={() => setOpenPageId(page.id)}
                      onMouseLeave={() => setOpenPageId(null)}
                    >
                      <Link
                        href={page.slug === "home" ? "/" : `/${page.slug}`}
                        className={`flex items-center gap-2 text-xl ${
                          isActiveParent
                            ? "text-red-500"
                            : "hover:text-[#1565c0]"
                        }`}
                      >
                        {page.title}
                        {children.length > 0 && <ChevronDown size={16} />}
                      </Link>

                      {children.length > 0 && openPageId === page.id && (
                        <div className="absolute left-0 bg-[#2b2f56] text-stone-200 rounded z-50 w-64">
                          {children.map((child) => {
                            const isActiveChild =
                              pathname === `/${page.slug}/${child.slug}`;
                            return (
                              <Link
                                key={child.id}
                                href={`/${page.slug}/${child.slug}`}
                                className={`block px-4 py-2 hover:bg-[#2f3780] hover:text-[#cd2b29] ${
                                  isActiveChild ? "font-bold bg-[#1565c0]" : ""
                                }`}
                              >
                                {child.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
          </div>

          {/* 3rd Column */}
          <div>
            <Image
              src="/logo.png"
              alt="Auto Deal Reveal Logo"
              width={160}
              height={80}
              className="h-13 w-auto mx-auto md:mx-0 "
              priority
            />
            <div className="mt-12 space-y-2 text-lg">
              <div className="text-noShadow text-stone-200 font-bold">
                Auto Deal Reveal, Inc.
              </div>
              {/* Location/Address */}
              <div className="font-light"></div>
              <div className="font-light"></div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="px-12">
          <div className="w-full border-t text-center py-6 text-sm leading-relaxed text-noShadow">
            Copyright © 2025 Auto Deal Reveal | All Rights Reserved.
            <span>
              <Link href={`/terms-and-conditions`}>
                <div className="text-blue-400 hover:text-blue-300 underline transition duration-200">
                  Terms and Conditions
                </div>
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
