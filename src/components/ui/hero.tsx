"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Heart, Code2, BookOpen, Layers, Terminal, Sparkles, ArrowRight } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";

// --- Custom SVG Components for Hand-Drawn Accents ---

const ArrowGreenLeft = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full text-[#CCFF00] stroke-current overflow-visible"
    fill="none"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10,90 C 10,40 40,20 60,50 C 70,65 80,75 95,70" />
    <path d="M80,55 L95,70 L85,85" />
  </svg>
);

const ArrowGreenRight = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full text-[#CCFF00] stroke-current overflow-visible"
    fill="none"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M90,10 C 80,60 60,80 40,60 C 20,40 40,20 60,30 C 80,40 70,70 50,80" />
    <path d="M65,75 L50,80 L55,65" />
  </svg>
);

const ArrowBlack1 = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full text-black stroke-current overflow-visible"
    fill="none"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20,80 Q 40,20 80,40" />
    <path d="M60,20 L80,40 L50,60" />
  </svg>
);

const ArrowBlack2 = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full text-black stroke-current overflow-visible"
    fill="none"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20,80 Q 40,20 80,40" />
    <path d="M60,20 L80,40 L50,60" />
  </svg>
);

const CircularBadge = ({ onClick }: { onClick?: () => void }) => (
  <div
    onClick={onClick}
    className="relative w-28 h-28 md:w-36 md:h-36 bg-[#CCFF00] rounded-full flex items-center justify-center shadow-xl rotate-12 hover:scale-105 transition-transform cursor-pointer border-[3px] border-black/5"
  >
    <div className="absolute inset-1 animate-[spin_10s_linear_infinite]">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path id="circlePath" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
        <text className="text-[10px] font-black tracking-[0.16em] uppercase" fill="black">
          <textPath href="#circlePath" startOffset="0%">
            100% FREE DOCS • ZERO ADS • OPEN SOURCE •
          </textPath>
        </text>
      </svg>
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="w-10 h-10 text-black stroke-current overflow-visible"
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20,80 Q 40,50 30,30 T 80,20" />
        <path d="M60,10 L80,20 L70,40" />
      </svg>
    </div>
  </div>
);

export const ZeroToDevHero = () => {
  const { openSearch } = useSearchStore();

  return (
    <div className="min-h-screen bg-[#0038FF] flex flex-col font-sans selection:bg-[#CCFF00] selection:text-black relative overflow-hidden w-full text-white">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-10 md:py-8 max-w-[1440px] mx-auto w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <div className="bg-white text-black font-black tracking-tight text-xs md:text-sm px-3 py-1.5 rounded-2xl rounded-bl-sm relative shadow-sm flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5 text-blue-600" />
            ZERO
            <div
              className="absolute -bottom-1.5 left-0 w-3 h-3 bg-white"
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            />
          </div>
          <div className="bg-[#CCFF00] text-black font-black text-xs md:text-sm px-3 py-1.5 rounded-full border-[1.5px] border-white shadow-sm">
            DEV
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-2">
          {[
            { name: "Tutorials", href: "/tutorials" },
            { name: "References", href: "/references" },
            { name: "Examples", href: "/examples" },
            { name: "Playground", href: "/playground" },
            { name: "Roadmaps", href: "/roadmaps" },
            { name: "Tools", href: "/tools" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-1.5 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Action Button: Search / GitHub */}
        <div className="flex items-center gap-2">
          <button
            onClick={openSearch}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white/20 rounded">⌘K</kbd>
          </button>
          <a
            href="https://github.com/Hamenath/zero2dev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full border border-white text-white text-xs md:text-sm font-semibold hover:bg-white hover:text-[#0038FF] transition-colors flex items-center gap-1"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            GitHub ⭐
          </a>
        </div>
      </nav>

      {/* Hero Main Section */}
      <main className="flex-1 relative z-10 pt-6 pb-28 md:pt-10 md:pb-40 px-4 flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto">
        {/* Massive Typography & Elements Container */}
        <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center z-10 mt-2 mb-12">
          {/* Text Stack */}
          <div className="w-full flex flex-col items-center relative z-10 space-y-1 md:space-y-3">
            {/* #ZERO2DEV */}
            <div className="w-full flex justify-start pl-[5%] sm:pl-[10%] md:pl-[20%] relative z-30">
              <h1
                className="text-[clamp(3.5rem,11vw,150px)] font-black leading-[0.85] tracking-tighter text-[#CCFF00] m-0 p-0 uppercase"
                style={{
                  fontFamily: '"Arial Black", Impact, sans-serif',
                  textShadow:
                    "1px 1px 0 #001A99, 2px 2px 0 #001A99, 3px 3px 0 #001A99, 4px 4px 0 #001A99, 5px 5px 0 #001A99, 6px 6px 0 #001A99, 7px 7px 0 #001A99, 8px 8px 0 #001A99, 9px 9px 0 #001A99, 10px 10px 0 #001A99, 11px 11px 0 #001A99, 12px 12px 0 #001A99",
                }}
              >
                #ZERO2DEV
              </h1>
            </div>

            {/* FREE DOCS */}
            <div className="w-full flex justify-center relative z-20">
              <h1
                className="text-[clamp(4rem,14vw,200px)] font-black leading-[0.85] tracking-tighter text-white m-0 p-0 uppercase"
                style={{
                  fontFamily: '"Arial Black", Impact, sans-serif',
                  textShadow:
                    "1px 1px 0 #001A99, 2px 2px 0 #001A99, 3px 3px 0 #001A99, 4px 4px 0 #001A99, 5px 5px 0 #001A99, 6px 6px 0 #001A99, 7px 7px 0 #001A99, 8px 8px 0 #001A99, 9px 9px 0 #001A99, 10px 10px 0 #001A99, 11px 11px 0 #001A99, 12px 12px 0 #001A99",
                }}
              >
                FREE DOCS
              </h1>
            </div>

            {/* FOR ALL */}
            <div className="w-full flex justify-start pl-[12%] sm:pl-[18%] md:pl-[28%] relative z-10">
              <h1
                className="text-[clamp(3.5rem,11vw,150px)] font-black leading-[0.85] tracking-tighter text-white m-0 p-0 uppercase"
                style={{
                  fontFamily: '"Arial Black", Impact, sans-serif',
                  textShadow:
                    "1px 1px 0 #001A99, 2px 2px 0 #001A99, 3px 3px 0 #001A99, 4px 4px 0 #001A99, 5px 5px 0 #001A99, 6px 6px 0 #001A99, 7px 7px 0 #001A99, 8px 8px 0 #001A99, 9px 9px 0 #001A99, 10px 10px 0 #001A99, 11px 11px 0 #001A99, 12px 12px 0 #001A99",
                }}
              >
                FOR ALL
              </h1>
            </div>
          </div>

          {/* Absolute Overlays (Glass Cards, Hand-Drawn Arrows, Spinning Badge) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Floating Glass Card 1 (Bottom Left) */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[8%] left-[2%] md:left-[15%] z-30 pointer-events-auto"
            >
              <Link href="/docs/html/introduction">
                <div className="w-40 md:w-52 aspect-[3/3.5] bg-white/20 backdrop-blur-md border border-white/40 rounded-[2rem] p-5 flex flex-col items-center justify-center rotate-[-12deg] shadow-2xl hover:rotate-0 transition-transform duration-500 cursor-pointer">
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-[#CCFF00] rounded-full flex items-center justify-center mb-3 shadow-inner border-[3px] border-white/50 text-black">
                    <BookOpen className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <div className="text-center">
                    <p className="font-extrabold text-xs md:text-sm text-white">HTML & CSS Docs</p>
                    <p className="text-[10px] md:text-xs text-[#CCFF00] font-bold mt-1">100% Free • No Login</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Floating Glass Card 2 (Top Right) */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[12%] right-[2%] md:right-[18%] z-30 pointer-events-auto"
            >
              <Link href="/playground">
                <div className="w-40 md:w-52 aspect-[3/3.5] bg-white/20 backdrop-blur-md border border-white/40 rounded-[2rem] p-5 flex flex-col items-center justify-center rotate-[12deg] shadow-2xl hover:rotate-0 transition-transform duration-500 cursor-pointer">
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-3 shadow-inner border-[3px] border-white/50 text-[#0038FF]">
                    <Terminal className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <div className="text-center">
                    <p className="font-extrabold text-xs md:text-sm text-white">Monaco IDE Sandbox</p>
                    <p className="text-[10px] md:text-xs text-[#CCFF00] font-bold mt-1">Live JS & Python</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Decorative Arrow Left */}
            <div className="absolute bottom-[0%] left-[0%] md:left-[8%] w-20 h-20 md:w-28 md:h-28 z-20 hidden sm:block">
              <ArrowGreenLeft />
            </div>

            {/* Decorative Arrow Right */}
            <div className="absolute top-[3%] right-[0%] md:right-[8%] w-20 h-20 md:w-28 md:h-28 z-20 hidden sm:block">
              <ArrowGreenRight />
            </div>

            {/* Circular Spinning Badge */}
            <div className="absolute bottom-[-12%] right-[2%] md:right-[12%] z-40 pointer-events-auto">
              <CircularBadge onClick={openSearch} />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Features Section */}
      <section className="bg-white text-black rounded-t-[2.5rem] md:rounded-t-[3.5rem] px-6 py-12 md:px-10 md:py-16 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.2)] mt-auto w-full">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1 */}
          <Link href="/tutorials" className="group">
            <div className="bg-[#F8F9FA] rounded-[2rem] p-8 flex flex-col items-center text-center relative h-64 border border-gray-100 group-hover:border-blue-400 group-hover:shadow-xl transition-all">
              <h3 className="text-xl md:text-2xl uppercase leading-tight mb-2 font-black text-gray-900">
                VS CODE EXPLORER<br />DOC TREES
              </h3>
              <p className="text-[11px] md:text-xs text-gray-500 font-bold mb-auto">
                Independent documentation trees for every technology
              </p>

              {/* Pill Graphic */}
              <div className="relative w-full flex justify-center mt-4">
                <div className="flex items-center bg-[#0038FF] rounded-2xl p-2 pr-14 text-white shadow-lg relative z-10">
                  <div className="w-7 h-7 bg-[#CCFF00] rounded-full mr-2 border border-white/30 flex items-center justify-center text-black font-bold text-xs">
                    ⚡
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold leading-none">HTML5 • CSS • JS • React</p>
                    <p className="text-[8px] text-white/80 leading-none mt-1">100+ Step-by-step guides</p>
                  </div>
                </div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#CCFF00] text-black font-black text-[10px] px-3 py-2 rounded-xl z-20 shadow-md">
                  FREE
                </div>
              </div>

              {/* Arrow pointing to next card */}
              <div className="hidden md:block absolute -right-12 bottom-8 w-16 h-16 z-30">
                <ArrowBlack1 />
              </div>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/playground" className="group">
            <div className="bg-[#F8F9FA] rounded-[2rem] p-8 flex flex-col items-center text-center relative h-64 border border-gray-100 group-hover:border-blue-400 group-hover:shadow-xl transition-all">
              <h3 className="text-xl md:text-2xl uppercase leading-tight mb-2 font-black text-gray-900">
                BROWSER MONACO<br />IDE SANDBOX
              </h3>
              <p className="text-[11px] md:text-xs text-gray-500 font-bold mb-auto">
                Run, edit & test code live with responsive previews
              </p>

              {/* Pill Graphic */}
              <div className="relative w-full flex justify-center mt-4">
                <div className="flex items-center bg-[#0038FF] rounded-full p-1.5 text-white shadow-lg">
                  <div className="bg-white/20 text-white font-bold text-xs px-3.5 py-1.5 rounded-full mr-2">
                    HTML • JS • Python
                  </div>
                  <div className="font-bold text-xs px-3 text-[#CCFF00]">
                    60 FPS
                  </div>
                </div>

                {/* Small floating green pill */}
                <div className="absolute -bottom-5 right-1/3 bg-[#CCFF00] rounded-full p-2.5 shadow-lg transform rotate-12 z-20">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-black stroke-current"
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>

              {/* Arrow pointing to next card */}
              <div className="hidden md:block absolute -right-12 bottom-8 w-16 h-16 z-30">
                <ArrowBlack2 />
              </div>
            </div>
          </Link>

          {/* Card 3 */}
          <Link href="/open-source" className="group">
            <div className="bg-[#F8F9FA] rounded-[2rem] p-8 flex flex-col items-center text-center relative h-64 border border-gray-100 group-hover:border-blue-400 group-hover:shadow-xl transition-all">
              <h3 className="text-xl md:text-2xl uppercase leading-tight mb-2 font-black text-gray-900">
                100% OPEN SOURCE<br />NO PAYWALLS
              </h3>
              <p className="text-[11px] md:text-xs text-gray-500 font-bold mb-auto">
                Zero signup • Zero ads • Built by global contributors
              </p>

              {/* Pill Graphic */}
              <div className="flex flex-col items-center bg-[#CCFF00] rounded-[2rem] px-6 py-3.5 text-black shadow-lg mt-4 relative w-full max-w-[220px]">
                <p className="text-[9px] font-bold uppercase tracking-wider mb-0.5">MIT OPEN LICENSE</p>
                <p className="text-lg font-black">1000+ TUTORIALS</p>

                {/* Speech bubble tail */}
                <div className="absolute -bottom-2 left-8 w-5 h-5 bg-[#CCFF00] transform rotate-45"></div>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ZeroToDevHero;
