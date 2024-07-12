import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

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
      <body className={mulish.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
