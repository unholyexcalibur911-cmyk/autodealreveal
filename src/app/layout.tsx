import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactUs from "@/components/ContactUs";


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
      <body>
        <Navbar/>
        <main>{children}</main>
        {/* the map should be here */}
        <ContactUs/>
        <Footer/>
      </body>
    </html>
  );
}