"use client";

import React from "react";

interface Partner {
  logoUrl: string;
  href: string;
}

interface ResponsiveHeroBannerProps {
  backgroundImageUrl?: string;
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
  backgroundImageUrl = "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg",
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
  return (
    <section className="w-full isolate min-h-[92vh] overflow-hidden relative flex flex-col justify-center">
      <img
        src={backgroundImageUrl}
        alt="Hero Background"
        className="w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

      <div className="z-10 relative pt-24 sm:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-3.5 py-2 ring-1 ring-white/20 backdrop-blur-md animate-fadeSlideIn">
              <span className="inline-flex items-center text-xs font-bold text-neutral-900 bg-white rounded-full py-0.5 px-2.5 font-sans">
                {badgeLabel}
              </span>
              <span className="text-sm font-medium text-white/90 font-sans">
                {badgeText}
              </span>
            </div>

            <h1 className="sm:text-6xl md:text-7xl lg:text-8xl leading-none text-4xl text-white tracking-tight font-extrabold animate-fadeSlideIn">
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
                  className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 hover:border-white/40 text-left text-white/80 text-sm transition-all shadow-xl group"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white/60 group-hover:text-white transition-colors"
                    >
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
                className="inline-flex items-center gap-2 hover:bg-white text-sm font-bold text-neutral-900 bg-white shadow-xl rounded-full py-3.5 px-7 font-sans transition-all hover:scale-105"
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
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/20 backdrop-blur-md px-7 py-3.5 text-sm font-semibold text-white font-sans transition-colors"
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
            <p className="text-xs text-white/60 text-center font-medium tracking-wider uppercase">
              {partnersTitle}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 text-white/70 mt-6 items-center justify-items-center gap-4">
              {partners.map((partner, index) => (
                <a
                  key={index}
                  href={partner.href}
                  className="inline-flex items-center justify-center bg-center w-[120px] h-[36px] bg-cover rounded-full opacity-70 hover:opacity-100 transition-opacity"
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
