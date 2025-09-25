"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

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
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [pages, setPages] = useState<Page[]>([]);
    const [childPages, setChildPages] = useState<ChildPage[]>([]); 
    const [openPageId, setOpenPageId] = useState<number | null>(null);
    const [mobileOpenPageId, setMobileOpenPageId] = useState<number | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            if (window.scrollY > 250) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        async function fetchPages() {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
                const pageRes = await fetch(`${baseUrl}/api/pages?populate[Sections][populate]=*`);
                const pageData = await pageRes.json();
                const childRes = await fetch(`${baseUrl}/api/childpages?populate[page]=true&populate[sections][populate]=*`);
                const childData = await childRes.json();
                const order = ["home", "about", "inventory", "products"];
                const sortedPages = [...pageData.data || []].sort (
                    (b: Page, a: Page) => order.indexOf(b.slug) - order.indexOf(a.slug)
                );
                setPages(sortedPages);
                setChildPages(childData.data || []);
            } catch (error) {
                console.error("Error fetching pages:", error);
            }
        }
        fetchPages();
    }, []);

    if (!mounted) {
        return null;
    }

    const getChildren = (pageId: number) => childPages.filter((child) => child.page?.id === pageId);

    return (
        <nav className={`sticky top-0 z-50 opacity-100 text-red-600 md:pr-15 px-6 py-8 lg:pr-20 whitespace-nowrap transition-all duration-300 ${isScrolled ? 'bg-stone-200 py-10' : 'bg-transparent'}`}> 
            <div className="flex justify-between items-center">
                {/* Logo or Brand Name */}
                <Link href="/" className="flex items-left pl-4">
                    <Image
                        src="/logo.png"
                        alt="Auto Deal Reveal Logo"
                        width={400}
                        height={80}
                        className="h-15 w-auto lg:block pr-5"
                        priority
                    />
                </Link> 
                {/* Desktop Menu */}
                <div className="hidden md:flex gap-30 justify-center items-center flex-1">
                    {pages.map((page) => {
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
                                        isActiveParent ? "text-[#3c3b6e]" : "hover:text-[#1565c0]"
                                    }`}
                                >
                                    {page.title}
                                    {children.length > 0 && <ChevronDown size={16} />}
                                </Link>

                                {children.length > 0 && openPageId === page.id && (
                                    <div className="absolute left-0 bg-stone-300 text-red-600 rounded z-50 w-64">
                                        {children.map((child) => {
                                            const isActiveChild = pathname === `/${page.slug}/${child.slug}`;
                                            return (
                                                <Link
                                                    key={child.id}
                                                    href={`/${page.slug}/${child.slug}`}
                                                    className={`block px-4 py-2 hover:bg-blue-200 ${
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
                {/* Mobile Menu Button */}
                <button
                className="md:hidden text-white hover:text-[#48bdcb]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
                </div>

                {/* Mobile Menu */}
                    {mobileMenuOpen && (
                    <div className="md:hidden mt-2 bg-stone-100 rounded-lg shadow-lg">
                    {pages.map((page) => {
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
                                className={`${isActiveParent ? "text-[#3c3b6e]" : "hover:text-[#1565c0]"}`}
                            >
                            {page.title}
                            </Link>
                                {children.length > 0 && (
                                <button onClick={() => setMobileOpenPageId(isOpen ? null : page.id)}>
                            <ChevronDown
                                size={16}
                                className={`${isOpen ? "rotate-180" : ""} transition-transform`}
                            />
                        </button>
                    )}
                </div>

                {children.length > 0 && isOpen && (
                    <div className="pl-6 pb-2">
                        {children.map((child) => {
                            const isActiveChild = pathname === `/${page.slug}/${child.slug}`;
                            return (
                                <Link
                                    key={child.id}
                                    href={`/${page.slug}/${child.slug}`}
                                    className={`block py-2 ${
                                        isActiveChild ? "text-[#48bdcb]" : "hover:text-[#48bdcb]"
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
