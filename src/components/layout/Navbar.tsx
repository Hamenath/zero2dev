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
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { openSearch } = useSearchStore();
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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

  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={`transition-all duration-300 z-50 ${
        isTransparent
          ? "absolute top-0 left-0 right-0 py-5 bg-transparent border-b border-white/10"
          : scrolled
          ? "sticky top-0 glass-nav py-3.5"
          : "sticky top-0 bg-white py-4 border-b border-black/[0.05]"
      }`}
    >
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shadow-md transition-colors ${
              isTransparent ? "bg-white text-gray-900" : "bg-gray-900 text-white group-hover:bg-blue-600"
            }`}
          >
            <Code2 className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span
            className={`font-extrabold text-lg tracking-tight ${
              isTransparent ? "text-white" : "text-gray-900"
            }`}
          >
            ZeroTo<span className={isTransparent ? "text-blue-400" : "text-blue-600"}>Dev</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isTransparent
                    ? isActive
                      ? "bg-white/20 text-white backdrop-blur-md"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                    : isActive
                    ? "bg-gray-100 text-blue-600 font-bold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isTransparent ? (isActive ? "text-white" : "text-white/70") : isActive ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Instant Search & GitHub Link */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search Button */}
          <button
            onClick={openSearch}
            className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              isTransparent
                ? "bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 backdrop-blur-md"
                : "bg-gray-50 hover:bg-gray-100 border border-black/[0.06] text-gray-500"
            }`}
          >
            <Search className={`w-3.5 h-3.5 ${isTransparent ? "text-white/70" : "text-gray-400"}`} />
            <span className="hidden sm:inline">Search docs...</span>
            <kbd
              className={`hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono rounded ${
                isTransparent ? "bg-white/20 text-white border border-white/20" : "bg-white text-gray-400 border border-gray-200"
              }`}
            >
              ⌘K
            </kbd>
          </button>

          {/* GitHub Open Source Repository Link */}
          <a
            href="https://github.com/Hamenath/zero2dev"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              isTransparent
                ? "bg-white text-neutral-900 hover:bg-white/90"
                : "bg-gray-900 hover:bg-black text-white"
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>
    </header>
  );
}
