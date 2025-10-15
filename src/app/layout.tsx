import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactUs from "@/components/ContactUs";
import ClientWrapper from "@/components/ClientWrapper";

export const metadata: Metadata = {
  title: "Auto Deal Reveal",
  description: "Auto Deal Reveal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <ClientWrapper>
          <Navbar />
          <main>{children}</main>

          <Footer />
        </ClientWrapper>
      </body>
    </html>
  );
}
