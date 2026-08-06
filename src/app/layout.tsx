import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/search/CommandPalette";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZeroToDev — Learn. Build. Master.",
  description:
    "The ultra-premium developer learning platform with interactive courses, real-time Monaco IDE, gamified skill trees, AI tutoring, and real-world roadmaps.",
  keywords: [
    "developer learning",
    "coding platform",
    "interactive courses",
    "Monaco editor",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "AI tutor",
    "developer roadmaps",
  ],
  authors: [{ name: "ZeroToDev Team" }],
  openGraph: {
    title: "ZeroToDev — Learn. Build. Master.",
    description:
      "The ultra-premium developer learning platform with interactive courses, real-time Monaco IDE, gamified skill trees, AI tutoring, and real-world roadmaps.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#111827] selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}
