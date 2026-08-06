"use client";

import { useState } from "react";
import { Clock, Copy, Check, Code2, ArrowLeft, ArrowRight, Share2, Compass } from "lucide-react";

export interface TocItem {
  id: string;
  title: string;
}

export interface TocRightSidebarProps {
  readingTime: string;
  headings: TocItem[];
  previousLesson?: { title: string; href: string };
  nextLesson?: { title: string; href: string };
}

export default function TocRightSidebar({
  readingTime,
  headings,
  previousLesson,
  nextLesson,
}: TocRightSidebarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="w-64 shrink-0 hidden xl:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pl-4 space-y-6 text-xs border-l border-black/[0.05]">
      {/* Reading Time & Quick Action Tools */}
      <div className="space-y-3 pb-4 border-b border-black/[0.05]">
        <div className="flex items-center gap-1.5 text-gray-500 font-medium">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          <span>{readingTime}</span>
        </div>

        <div className="flex flex-col gap-1.5 pt-1">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors font-medium text-left"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
            <span>{copied ? "Link Copied" : "Copy Page Link"}</span>
          </button>

          <a
            href="https://github.com/Hamenath/zero2dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors font-medium"
          >
            <Code2 className="w-3.5 h-3.5 text-gray-400" />
            <span>Edit on GitHub</span>
          </a>
        </div>
      </div>

      {/* On This Page Table of Contents */}
      <div className="space-y-2">
        <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">
          On This Page
        </h4>

        <div className="space-y-1 pl-2 border-l border-black/[0.06]">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className="block py-1 text-gray-500 hover:text-blue-600 transition-colors leading-normal"
            >
              {h.title}
            </a>
          ))}
        </div>
      </div>

      {/* Previous / Next Navigation Links */}
      {(previousLesson || nextLesson) && (
        <div className="pt-4 border-t border-black/[0.05] space-y-2">
          {previousLesson && (
            <a
              href={previousLesson.href}
              className="block p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100/80 transition-colors space-y-0.5"
            >
              <span className="text-[10px] text-gray-400 font-semibold flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Previous Lesson
              </span>
              <p className="font-bold text-gray-900 truncate">{previousLesson.title}</p>
            </a>
          )}

          {nextLesson && (
            <a
              href={nextLesson.href}
              className="block p-2.5 rounded-xl bg-blue-50/80 hover:bg-blue-100/80 transition-colors space-y-0.5"
            >
              <span className="text-[10px] text-blue-600 font-bold flex items-center justify-end gap-1">
                Next Lesson <ArrowRight className="w-3 h-3" />
              </span>
              <p className="font-bold text-blue-950 truncate text-right">{nextLesson.title}</p>
            </a>
          )}
        </div>
      )}
    </aside>
  );
}
