"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight, BookOpen, ChevronDown, ShieldCheck } from "lucide-react";

interface ResponsiveHeroBannerProps {
  badgeText?: string;
  titleLine2?: string;
  titleHighlight?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  searchPlaceholder?: string;
  trustLine1?: string;
  trustLine2?: string;
  onSearchClick?: () => void;
}

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
  badgeText = "100% Free • Open Source • Community Driven",
  titleLine2 = "The Modern Engine for",
  titleHighlight = "Open-Source Developer Docs",
  description = "Zero accounts required. Zero paywalls. Zero ads. Pure developer documentation, interactive Monaco IDE execution, and step-by-step visual roadmaps.",
  primaryButtonText = "Start Learning",
  primaryButtonHref = "/docs/html/introduction",
  secondaryButtonText = "Explore Documentation",
  secondaryButtonHref = "/tutorials",
  searchPlaceholder = "Search tutorials, references, examples...",
  trustLine1 = "Trusted by developers, students, and open-source contributors worldwide.",
  trustLine2 = "1000+ tutorials • Interactive examples • Modern documentation • Forever free",
  onSearchClick,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-white text-gray-900 pt-12 pb-16 sm:pt-20 sm:pb-24 md:pt-28 md:pb-32 flex flex-col items-center justify-center">
      {/* 1. Ambient Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* 2. Soft Ambient Blur Mesh Glow Behind Heading */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[200px] sm:h-[350px] bg-gradient-to-tr from-blue-100/60 via-indigo-100/40 to-sky-100/60 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />

      {/* 3. Floating Geometric Ambient Shapes */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[8%] hidden lg:flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-xl border border-black/[0.06] text-blue-600"
      >
        <BookOpen className="w-5 h-5" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-28 right-[8%] hidden lg:flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-xl border border-black/[0.06] text-indigo-600"
      >
        <Sparkles className="w-5 h-5" />
      </motion.div>

      {/* 4. Main Hero Container (Centered, Max Width 1100px) */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-10 w-full">
        {/* Premium Glass Hero Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center max-w-full"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 border border-black/[0.08] shadow-sm backdrop-blur-md text-[11px] sm:text-xs font-semibold text-gray-700 max-w-full">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
            <span className="truncate">{badgeText}</span>
          </div>
        </motion.div>

        {/* Heading Typography (Responsive scaling for 320px–480px mobile screens) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="space-y-3 max-w-full"
        >
          <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-snug sm:leading-[1.12] break-words">
            <span className="text-gray-900 block">{titleLine2}</span>
            <span className="text-blue-600 block mt-1">{titleHighlight}</span>
          </h1>

          {/* Subtitle / Description */}
          <p className="max-w-[65ch] mx-auto text-xs sm:text-base md:text-lg text-gray-500 font-normal leading-relaxed pt-1 sm:pt-2 px-2">
            {description}
          </p>
        </motion.div>

        {/* Primary Interactive Element: Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="max-w-xl mx-auto w-full px-1"
        >
          <button
            onClick={onSearchClick}
            className="w-full flex items-center justify-between px-3.5 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white border border-black/10 shadow-md hover:shadow-xl hover:border-blue-500/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-gray-500 group-hover:text-gray-800 transition-colors truncate">
                {searchPlaceholder}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              <kbd className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-mono font-bold text-gray-400 bg-gray-100 rounded-md sm:rounded-lg border border-gray-200">
                ⌘K
              </kbd>
            </div>
          </button>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1 w-full px-2"
        >
          <Link
            href={primaryButtonHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
          >
            {primaryButtonText}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={secondaryButtonHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-gray-100 border border-black/[0.08] text-gray-800 font-semibold text-xs sm:text-sm transition-all active:scale-[0.98]"
          >
            {secondaryButtonText}
          </Link>
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="pt-4 sm:pt-6 space-y-1 border-t border-black/[0.06] max-w-lg mx-auto px-2"
        >
          <p className="text-[11px] sm:text-xs font-semibold text-gray-600">
            {trustLine1}
          </p>
          <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium leading-relaxed">
            {trustLine2}
          </p>
        </motion.div>
      </div>

      {/* 5. Elegant Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mt-10 sm:mt-16 flex flex-col items-center gap-1 text-gray-400 hidden sm:flex"
      >
        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Scroll to explore</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
};

export default ResponsiveHeroBanner;
