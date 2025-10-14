"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import Support from "./Support";

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

export default function Navbar() {
  const pathname = usePathname();
  const [pages, setPages] = useState<Page[]>([]);
  const [childPages, setChildPages] = useState<ChildPage[]>([]);
  const [openPageId, setOpenPageId] = useState<number | null>(null);
  const [mobileOpenPageId, setMobileOpenPageId] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchPages() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
        const pageRes = await fetch(`${baseUrl}/api/pages`);
        const pageData = await pageRes.json();
        const childRes = await fetch(`${baseUrl}/api/childpages?populate=page`);
        const childData = await childRes.json();
        const order = ["home", "products", "about-us"];
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
    <nav className="sticky top-0 z-50 opacity-100 md:pr-15 pl-6 py-4 lg:pr-20 whitespace-nowrap transition-all duration-300 bg-[#131022]  shadow-lg border-b border-gray-800">
      <div className="flex justify-between items-center">
        {/* Logo or Brand Name */}
        <Link href="/" className="flex justify-start pl-6">
          <Image
            src="/logo.png"
            alt="Auto Deal Reveal Logo"
            width={400}
            height={80}
            className="h-15 w-auto lg:block pr-5 fixed relative"
            priority
          />
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 pr-25 justify-end items-center flex-1 text-left text-[#edf2f4]">
          {pages.length === 0
            ? null
            : pages.map((page) => {
                if (
                  page.slug === "terms-and-conditions" ||
                  page.slug === "privacy-policy" ||
                  page.slug === "contact-us"
                )
                  return; // Skip rendering children for "terms-and-conditions" page
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
                      className={`flex items-center gap-2 text-2xl ${
                        isActiveParent
                          ? "text-[#6366f1]  p-2"
                          : "hover:text-[#6366f1]"
                      }`}
                    >
                      {page.title}
                      {children.length > 0 && <ChevronDown size={16} />}
                    </Link>

                    {children.length > 0 && openPageId === page.id && (
                      <div className="absolute -left-20 bg-[#2b2f56] text-stone-200 rounded z-50 w-64 p-2">
                        {children.map((child) => {
                          const isActiveChild =
                            pathname === `/${page.slug}/${child.slug}`;

                          return (
                            <Link
                              key={child.id}
                              href={`/${page.slug}/${child.slug}`}
                              className={`block px-4 py-2 hover:bg-[#2f3780] hover:text-[#6366f1] ${
                                isActiveChild ? "font-bold bg-[#6366f1]" : ""
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
          {/* Support Button */}
          <Support />
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#2b2d42] px-6 hover:text-[#48bdcb]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute right-2 items-right justify-end md:hidden mt-2 bg-stone-100 rounded-lg shadow-lg">
          {pages.length === 0
            ? null
            : pages.map((page) => {
                const children = getChildren(page.id);
                const isOpen = mobileOpenPageId === page.id;
                const isActiveParent =
                  pathname === `/${page.slug}` ||
                  pathname.startsWith(`/${page.slug}/`) ||
                  (page.slug === "home" && pathname === "/");

                return (
                  <div key={page.id} className="border-b border-gray-800">
                    <div className="flex justify-between items-center px-4 py-3 text-lg">
                      <Link
                        href={`/${page.slug === "home" ? "" : page.slug}`}
                        className={`${
                          isActiveParent
                            ? "text-[#3c3b6e]"
                            : "hover:text-[#1565c0]"
                        }`}
                      >
                        {page.title}
                      </Link>
                      {children.length > 0 && (
                        <button
                          onClick={() =>
                            setMobileOpenPageId(isOpen ? null : page.id)
                          }
                        >
                          <ChevronDown
                            size={16}
                            className={`${
                              isOpen ? "rotate-180" : ""
                            } transition-transform`}
                          />
                        </button>
                      )}
                    </div>

                    {children.length > 0 && isOpen && (
                      <div className="pl-6 pb-2">
                        {children.map((child) => {
                          const isActiveChild =
                            pathname === `/${page.slug}/${child.slug}`;
                          return (
                            <Link
                              key={child.id}
                              href={`/${page.slug}/${child.slug}`}
                              className={`block py-2 ${
                                isActiveChild
                                  ? "text-[#48bdcb]"
                                  : "hover:text-[#48bdcb]"
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
      )}
    </nav>
  );
}
