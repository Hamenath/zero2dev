"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, ChevronDown, ChevronRight, BookOpen, CheckCircle2 } from "lucide-react";

export interface Chapter {
  title: string;
  items: { slug: string; title: string; duration: string }[];
}

export interface TutorialSidebarProps {
  categoryTitle: string;
  chapters: Chapter[];
}

export default function TutorialSidebar({ categoryTitle, chapters }: TutorialSidebarProps) {
  const pathname = usePathname();
  const [filterQuery, setFilterQuery] = useState("");
  const [openChapters, setOpenChapters] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });

  const toggleChapter = (index: number) => {
    setOpenChapters((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <aside className="w-64 shrink-0 hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pr-4 space-y-4 border-r border-black/[0.05]">
      {/* Category Header */}
      <div className="space-y-3 pb-3 border-b border-black/[0.05]">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            {categoryTitle} Documentation
          </h3>
        </div>

        {/* Local Search Filter Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter chapters..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-gray-50 border border-black/[0.06] text-gray-900 focus:outline-none focus:border-blue-500 font-medium"
          />
        </div>
      </div>

      {/* Chapters Accordion List */}
      <div className="space-y-3 text-xs">
        {chapters.map((chapter, cIdx) => {
          const isOpen = openChapters[cIdx] ?? true;
          const filteredItems = chapter.items.filter((item) =>
            item.title.toLowerCase().includes(filterQuery.toLowerCase())
          );

          if (filterQuery && filteredItems.length === 0) return null;

          return (
            <div key={cIdx} className="space-y-1">
              {/* Chapter Header */}
              <button
                onClick={() => toggleChapter(cIdx)}
                className="w-full flex items-center justify-between py-1.5 text-xs font-bold text-gray-900 hover:text-blue-600 transition-colors text-left"
              >
                <span>{chapter.title}</span>
                {isOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                )}
              </button>

              {/* Items List */}
              {isOpen && (
                <div className="space-y-0.5 pl-2 border-l border-black/[0.06]">
                  {filteredItems.map((item) => {
                    const isActive = pathname?.includes(item.slug);
                    return (
                      <Link
                        key={item.slug}
                        href={`/tutorials/${item.slug}`}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-bold"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        <span className="truncate">{item.title}</span>
                        <span className="text-[10px] text-gray-400 font-normal shrink-0 ml-1">
                          {item.duration}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
