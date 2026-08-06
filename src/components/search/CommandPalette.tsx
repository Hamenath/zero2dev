"use client";

import { useSearchStore } from "@/store/useSearchStore";
import Fuse from "fuse.js";
import { Search, X, BookOpen, BrainCircuit, Map, FileText, Sparkles, ArrowRight, CornerDownLeft, Wrench, Heart, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

const SEARCH_DATABASE = [
  { id: "1", category: "courses", title: "HTML5 & Modern Web Semantics", description: "Document architecture, WCAG AA accessibility, forms", href: "/courses/html5-mastery" },
  { id: "2", category: "courses", title: "CSS Modern Layouts & Flexbox/Grid", description: "Grid subgrid, flexbox alignment, animations", href: "/courses/css-layouts" },
  { id: "3", category: "courses", title: "Modern JavaScript Mastery", description: "Event loop, Promises, closures, ESNext", href: "/courses/js-modern" },
  { id: "4", category: "courses", title: "React 19 & Next.js 16 App Router", description: "RSC, Server Actions, streaming, dynamic routing", href: "/courses/react-19-next-16" },
  { id: "5", category: "roadmaps", title: "Frontend Developer Roadmap 2026", description: "HTML to Next.js 16, TypeScript, State, Performance", href: "/roadmaps/frontend" },
  { id: "6", category: "roadmaps", title: "Backend Engineer Roadmap 2026", description: "NestJS, PostgreSQL, Redis, Microservices, Docker", href: "/roadmaps/backend" },
  { id: "7", category: "roadmaps", title: "AI Engineer Roadmap 2026", description: "RAG, Vector DBs, LangChain, Embeddings, Ollama", href: "/roadmaps/ai-engineer" },
  { id: "8", category: "tools", title: "CSS Box Shadow Generator", description: "Live blur, offset, spread, and CSS code generator", href: "/tools" },
  { id: "9", category: "tools", title: "CSS Gradient Generator", description: "Linear gradient angles, colors, and CSS output", href: "/tools" },
  { id: "10", category: "tools", title: "JSON Formatter & Validator", description: "Format, validate, and debug JSON payloads", href: "/tools" },
  { id: "11", category: "tools", title: "UUID v4 & Password Generator", description: "Instant secure random ID and password generator", href: "/tools" },
  { id: "12", category: "references", title: "CSS grid-template-columns", description: "API Syntax, auto-fit, minmax(), browser support", href: "/references" },
  { id: "13", category: "references", title: "JavaScript Array.prototype.reduce()", description: "Method signature, accumulator, initial value", href: "/references" },
  { id: "14", category: "open-source", title: "ZeroToDev GitHub Repository", description: "100% Free MIT Open Source codebase & contribution guide", href: "/open-source" },
  { id: "15", category: "ai", title: "Ask AI: How does React 19 use() hook work?", description: "Instant AI explanation with code snippet", href: "/ai-tutor" },
];

export default function CommandPalette() {
  const { isOpen, closeSearch, query, setQuery, activeCategory, setActiveCategory } = useSearchStore();
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("zerotodev_recent_searches");
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch {}
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(SEARCH_DATABASE, {
        keys: ["title", "description", "category"],
        threshold: 0.4,
      }),
    []
  );

  const filteredResults = useMemo(() => {
    let items = SEARCH_DATABASE;
    if (query.trim().length > 0) {
      items = fuse.search(query).map((res) => res.item);
    }
    if (activeCategory !== "all") {
      items = items.filter((item) => item.category === activeCategory);
    }
    return items;
  }, [query, activeCategory, fuse]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  const handleSelectItem = (href: string, title: string) => {
    try {
      const updated = Array.from(new Set([title, ...recentSearches])).slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("zerotodev_recent_searches", JSON.stringify(updated));
    } catch {}
    router.push(href);
    closeSearch();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        closeSearch();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
      } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
        e.preventDefault();
        handleSelectItem(filteredResults[selectedIndex].href, filteredResults[selectedIndex].title);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, closeSearch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-2xl bg-white border border-black/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-black/[0.06] bg-gray-50/50 gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, topic, tool, API method, or AI query..."
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none font-medium"
            autoFocus
          />
          <button
            onClick={closeSearch}
            className="p-1 rounded-lg hover:bg-gray-200/60 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-white border-b border-black/[0.04] overflow-x-auto text-xs">
          {[
            { id: "all", label: "All" },
            { id: "courses", label: "Courses" },
            { id: "roadmaps", label: "Roadmaps" },
            { id: "tools", label: "Dev Tools" },
            { id: "references", label: "References" },
            { id: "ai", label: "AI Answers" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-blue-50 text-blue-600 border border-blue-200/60 font-semibold"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-xs">
              <Sparkles className="w-6 h-6 mx-auto mb-2 text-blue-500/60 animate-pulse" />
              No results found for "{query}". <br />
              <button
                onClick={() => {
                  router.push(`/ai-tutor?prompt=${encodeURIComponent(query)}`);
                  closeSearch();
                }}
                className="mt-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Ask ZeroToDev AI Tutor <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              let Icon = BookOpen;
              if (item.category === "roadmaps") Icon = Map;
              if (item.category === "tools") Icon = Wrench;
              if (item.category === "references") Icon = FileText;
              if (item.category === "ai") Icon = Sparkles;
              if (item.category === "open-source") Icon = Heart;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item.href, item.title)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                    isSelected
                      ? "bg-blue-50/80 border border-blue-200/60 shadow-sm"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 truncate">{item.title}</h4>
                      <p className="text-[11px] text-gray-500 truncate">{item.description}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-blue-600 bg-white px-2 py-0.5 rounded border border-blue-200 shrink-0">
                      <span>Jump</span>
                      <CornerDownLeft className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-gray-50/80 border-t border-black/[0.05] flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 py-0.5 bg-white border border-gray-200 rounded font-mono text-[9px] text-gray-600">↑↓</kbd> navigate</span>
            <span><kbd className="px-1 py-0.5 bg-white border border-gray-200 rounded font-mono text-[9px] text-gray-600">↵</kbd> select</span>
          </div>
          <span className="font-semibold text-emerald-600">Powered by Fuse.js • 100% Free</span>
        </div>
      </div>
    </div>
  );
}
