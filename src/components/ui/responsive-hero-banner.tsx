"use client";

import React, { useState } from "react";

interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

interface Partner {
  logoUrl: string;
  href: string;
}

interface ResponsiveHeroBannerProps {
  logoUrl?: string;
  backgroundImageUrl?: string;
  navLinks?: NavLink[];
  ctaButtonText?: string;
  ctaButtonHref?: string;
  badgeText?: string;
  badgeLabel?: string;
  title?: string;
  titleLine2?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  partnersTitle?: string;
  partners?: Partner[];
  onSearchClick?: () => void;
}

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
  logoUrl = "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/febf2421-4a9a-42d6-871d-ff4f9518021c_1600w.png",
  backgroundImageUrl = "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg",
  navLinks = [
    { label: "Home", href: "/", isActive: true },
    { label: "Tutorials", href: "/tutorials" },
    { label: "References", href: "/references" },
    { label: "Playground", href: "/playground" },
    { label: "Roadmaps", href: "/roadmaps" },
    { label: "Tools", href: "/tools" },
  ],
  ctaButtonText = "GitHub ⭐",
  ctaButtonHref = "https://github.com/Hamenath/zero2dev",
  badgeLabel = "100% Free",
  badgeText = "Open-Source Documentation & Learning Engine 2026",
  title = "Learn. Build. Master.",
  titleLine2 = "Clean Open-Source Docs",
  description = "Zero accounts required. Zero paywalls. Zero ads. Pure developer documentation, interactive Monaco IDE execution, and step-by-step visual roadmaps.",
  primaryButtonText = "Explore Tutorials",
  primaryButtonHref = "/tutorials",
  secondaryButtonText = "Launch IDE Sandbox",
  secondaryButtonHref = "/playground",
  partnersTitle = "Trusted by software engineers & open-source contributors worldwide",
  partners = [
    { logoUrl: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/f7466370-2832-4fdd-84c2-0932bb0dd850_800w.png", href: "#" },
    { logoUrl: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0a9a71ec-268b-4689-a510-56f57e9d4f13_1600w.png", href: "#" },
    { logoUrl: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a9ed4369-748a-49f8-9995-55d6c876bbff_1600w.png", href: "#" },
    { logoUrl: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0d8966a4-8525-4e11-9d5d-2d7390b2c798_1600w.png", href: "#" },
    { logoUrl: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2ed33c8b-b8b2-4176-967f-3d785fed07d8_1600w.png", href: "#" },
  ],
  onSearchClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="w-full isolate min-h-[90vh] overflow-hidden relative rounded-3xl shadow-2xl my-4">
      <img
        src={backgroundImageUrl}
        alt="Hero Background"
        className="w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/50 backdrop-blur-[2px] ring-1 ring-black/30" />

      <header className="z-10 xl:top-4 relative">
        <div className="mx-6">
          <div className="flex items-center justify-between pt-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-white font-extrabold text-xl tracking-tight"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              ZeroTo<span className="text-blue-400">Dev</span>
            </a>

            <nav className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-white/10 px-1.5 py-1 ring-1 ring-white/15 backdrop-blur-md">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium hover:text-white font-sans transition-colors ${
                      link.isActive ? "text-white font-bold" : "text-white/80"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={ctaButtonHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-neutral-900 hover:bg-white/90 font-sans transition-colors shadow-sm"
                >
                  {ctaButtonText}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </a>
              </div>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white/90"
              >
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="z-10 relative">
        <div className="sm:pt-24 md:pt-28 lg:pt-32 max-w-7xl mx-auto pt-20 px-6 pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/15 backdrop-blur animate-fadeSlideIn">
              <span className="inline-flex items-center text-xs font-bold text-neutral-900 bg-white/90 rounded-full py-0.5 px-2.5 font-sans">
                {badgeLabel}
              </span>
              <span className="text-sm font-medium text-white/90 font-sans">
                {badgeText}
              </span>
            </div>

            <h1 className="sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-4xl text-white tracking-tight font-extrabold animate-fadeSlideIn">
              {title}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300">
                {titleLine2}
              </span>
            </h1>

            <p className="sm:text-lg text-base text-white/80 max-w-2xl mt-6 mx-auto leading-relaxed animate-fadeSlideIn">
              {description}
            </p>

            {/* Quick Search Bar Trigger inside Hero */}
            {onSearchClick && (
              <div className="mt-8 max-w-lg mx-auto">
                <button
                  onClick={onSearchClick}
                  className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 hover:border-white/40 text-left text-white/80 text-sm transition-all shadow-lg group"
                >
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60 group-hover:text-white transition-colors">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span>Search 100+ documentation guides, tools, or press /</span>
                  </div>
                  <kbd className="px-2 py-0.5 text-xs font-mono bg-white/20 rounded border border-white/20 text-white font-bold">
                    ⌘K
                  </kbd>
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:gap-4 mt-8 gap-3 items-center justify-center animate-fadeSlideIn">
              <a
                href={primaryButtonHref}
                className="inline-flex items-center gap-2 hover:bg-white text-sm font-bold text-neutral-900 bg-white shadow-lg rounded-full py-3 px-6 font-sans transition-all hover:scale-105"
              >
                {primaryButtonText}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
              <a
                href={secondaryButtonHref}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/20 backdrop-blur-md px-6 py-3 text-sm font-semibold text-white font-sans transition-colors"
              >
                {secondaryButtonText}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <p className="text-sm text-white/70 text-center font-medium">
              {partnersTitle}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 text-white/70 mt-6 items-center justify-items-center gap-4">
              {partners.map((partner, index) => (
                <a
                  key={index}
                  href={partner.href}
                  className="inline-flex items-center justify-center bg-center w-[120px] h-[36px] bg-cover rounded-full opacity-80 hover:opacity-100 transition-opacity"
                  style={{ backgroundImage: `url(${partner.logoUrl})` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResponsiveHeroBanner;
