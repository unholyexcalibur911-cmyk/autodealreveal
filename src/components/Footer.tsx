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
        );
        const pageData = await pageRes.json();

        const childRes = await fetch(
          `${baseUrl}/api/childpages?populate[page]=true&populate[sections][populate]=*`
        );
        const childData = await childRes.json();

        const order = ["home", "about-us", "inventory", "products"];
        const sortedPages = [...(pageData.data || [])].sort(
          (a: any, b: any) => order.indexOf(a.slug) - order.indexOf(b.slug)
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
    <footer className="bg-[#131022] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-6">

          <div className="text-center sm:text-left">
            <p className="text-white font-bold">
              Contact Us:{" "}
              <span className="text-[#6366f1]">(814) 707-9899</span>
            </p>
            <div className="text-sm text-gray-400 mt-2">
              © 2025 All Rights Reserved | Auto Deal Reveal
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}