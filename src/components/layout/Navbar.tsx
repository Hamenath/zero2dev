"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchStore } from "@/store/useSearchStore";
import {
  BookOpen,
  Map,
  Code2,
  Search,
  FileText,
  Wrench,
  Heart,
  ExternalLink,
  Layers,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const { openSearch } = useSearchStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide top Navbar on homepage to prevent duplicate header with ZeroToDevHero
  if (pathname === "/") {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Ctrl+K / Cmd+K or / shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      } else if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openSearch]);

  const navLinks = [
    { name: "Tutorials", href: "/tutorials", icon: BookOpen },
    { name: "References", href: "/references", icon: FileText },
    { name: "Examples", href: "/examples", icon: Layers },
    { name: "Playground", href: "/playground", icon: Code2 },
    { name: "Roadmaps", href: "/roadmaps", icon: Map },
    { name: "Tools", href: "/tools", icon: Wrench },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-nav-hero py-3 shadow-lg"
            : "bg-[#0038FF]/90 backdrop-blur-md py-4 border-b border-white/15"
        }`}
      >
        <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-1 group shrink-0">
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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#CCFF00] text-black font-bold border border-white shadow-sm"
                      : "text-white/80 hover:text-white hover:bg-white/10 border border-white/20"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-black" : "text-white/70"}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Instant Search, GitHub, & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Search Button */}
            <button
              onClick={openSearch}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/25 text-white transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/20 text-white">
                ⌘K
              </kbd>
            </button>

            {/* GitHub Open Source Repository Link */}
            <a
              href="https://github.com/Hamenath/zero2dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white hover:bg-[#CCFF00] text-black text-xs font-bold transition-all shadow-sm"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>GitHub</span>
            </a>

            {/* Mobile Drawer Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors border border-white/20"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-Out Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden sticky top-[60px] z-40 bg-[#0038FF] border-b border-white/20 shadow-2xl overflow-hidden"
          >
            <div className="px-5 py-4 space-y-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                      isActive
                        ? "bg-[#CCFF00] text-black"
                        : "text-white hover:bg-white/10 border border-white/15"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-[#CCFF00]"}`} />
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-white/15 mt-2">
                <a
                  href="https://github.com/Hamenath/zero2dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white text-black font-bold text-xs"
                >
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>Star on GitHub (Hamenath/zero2dev)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
