// src/app/layout.js

import { Geist, Geist_Mono } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "ShopSmart - Modern Ecommerce Store",
    template: "%s | ShopSmart",
  },

  description:
    "ShopSmart is a modern full-stack ecommerce platform built with Next.js and MERN stack. Buy products online with fast checkout, secure payments, and best deals.",

  keywords: [
    "ecommerce",
    "online shopping",
    "buy products online",
    "nextjs ecommerce",
    "mern stack store",
    "react ecommerce",
    "full stack ecommerce",
  ],

  authors: [{ name: "ShopSmart Team" }],

  creator: "ShopSmart",

  metadataBase: new URL("http://localhost:3000"),

  openGraph: {
    title: "ShopSmart - Modern Ecommerce Store",
    description:
      "Buy trending products online with fast checkout and secure system.",
    url: "http://localhost:3000",
    siteName: "ShopSmart",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ShopSmart Ecommerce Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ShopSmart Ecommerce",
    description:
      "Modern ecommerce platform built with Next.js + MERN stack",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">

        <LayoutWrapper>
          {children}
        </LayoutWrapper>

      </body>
    </html>
  );
}