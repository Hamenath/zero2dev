"use client";

import { useState } from "react";
import { Clock, Share2, Check, ArrowRight, ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";

interface HeadingItem {
  id: string;
  title: string;
}

interface TocRightSidebarProps {
  readingTime?: string;
  headings?: HeadingItem[];
  previousLesson?: { title: string; href: string };
  nextLesson?: { title: string; href: string };
}

export default function TocRightSidebar({
  readingTime = "8 min read",
  headings = [
    { id: "introduction", title: "Introduction & Specs" },
    { id: "code-example", title: "Production Code Example" },
  ],
  previousLesson,
  nextLesson,
}: TocRightSidebarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="w-64 shrink-0 hidden xl:block sticky top-28 h-[calc(100vh-7rem)] overflow-y-auto pl-4 space-y-6 text-xs border-l border-white/15 text-white">
      {/* Quick Action Tools */}
      <div className="space-y-3 pb-4 border-b border-white/15">
        <div className="flex items-center gap-1.5 text-white/70 font-medium">
          <Clock className="w-3.5 h-3.5 text-[#CCFF00]" />
          <span>{readingTime}</span>
        </div>

        <button
          onClick={handleCopyLink}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/10 hover:bg-[#CCFF00] hover:text-black border border-white/20 transition-all font-bold"
        >
          <span>{copied ? "Link Copied!" : "Share Lesson"}</span>
          {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* On This Page Table of Contents */}
      <div className="space-y-3">
        <h4 className="font-black uppercase tracking-wider text-[10px] text-[#CCFF00]">
          On This Page
        </h4>
        <nav className="space-y-1.5 font-medium">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className="block py-1 px-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              {heading.title}
            </a>
          ))}
        </nav>
      </div>

      {/* Navigation Quick Links */}
      {(previousLesson || nextLesson) && (
        <div className="pt-4 border-t border-white/15 space-y-2">
          <h4 className="font-black uppercase tracking-wider text-[10px] text-[#CCFF00]">
            Navigation
          </h4>
          {previousLesson && (
            <a
              href={previousLesson.href}
              className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3 h-3 text-[#CCFF00]" />
              <span className="truncate">{previousLesson.title}</span>
            </a>
          )}
          {nextLesson && (
            <a
              href={nextLesson.href}
              className="flex items-center gap-1.5 text-[#CCFF00] font-bold hover:underline transition-all"
            >
              <span className="truncate">{nextLesson.title}</span>
              <ArrowRight className="w-3 h-3 text-[#CCFF00]" />
            </a>
          )}
        </div>
      )}
    </aside>
  );
}
