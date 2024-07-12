import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blessed",
  description: "God bless you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Navbar /> */}
      <body className={`${mulish.className} bg-[#f5f5f5] hidescroll`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
