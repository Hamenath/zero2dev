"use client";

import Link from "next/link";
import MonacoPlayground from "@/components/playground/MonacoPlayground";
import CodeBlock from "@/components/tutorial/CodeBlock";
import ResponsiveHeroBanner from "@/components/ui/responsive-hero-banner";
import { useSearchStore } from "@/store/useSearchStore";
import {
  BookOpen,
  Map,
  Code2,
  Search,
  ArrowRight,
  Heart,
  Wrench,
  Layers,
  Sparkles,
  CheckCircle2,
  FileText,
  Star,
  Users,
} from "lucide-react";

export default function HomePage() {
  const { openSearch } = useSearchStore();

  return (
    <div className="space-y-16 pb-20">
      {/* HERO SECTION */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <ResponsiveHeroBanner onSearchClick={openSearch} />
      </div>

      {/* FEATURED TUTORIALS GRID */}
      <section className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
              Curated Documentation
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
              Popular Learning Pathways
            </h2>
          </div>
          <Link
            href="/tutorials"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            Explore All Tutorials <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "HTML5 & Web Semantics",
              desc: "Document architecture, WCAG AA accessibility, forms, and ARIA attributes.",
              slug: "html5-document-structure",
              tag: "Frontend",
            },
            {
              title: "CSS Modern Layouts & Grid",
              desc: "2D CSS Grid, flexbox alignment, container queries, and subgrid specs.",
              slug: "css-flexbox-grid-guide",
              tag: "CSS Engine",
            },
            {
              title: "Modern JavaScript Mastery",
              desc: "Event loop mechanics, Promises, async/await, closures, and ES Modules.",
              slug: "javascript-event-loop-async",
              tag: "Core JS",
            },
          ].map((item, i) => (
            <Link
              key={i}
              href={`/tutorials/${item.slug}`}
              className="premium-card p-6 flex flex-col justify-between group hover:border-blue-400 transition-all space-y-6"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-black/[0.05] flex justify-end">
                <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read Documentation <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MONACO IDE PREVIEW */}
      <section className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
              Zero-Setup Workspace
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
              Browser Monaco Code IDE
            </h2>
          </div>
          <Link
            href="/playground"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Open Fullscreen IDE <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <MonacoPlayground height="500px" />
      </section>

      {/* DEVELOPER TOOLS HIGHLIGHT */}
      <section className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="premium-card p-8 md:p-12 bg-gradient-to-r from-gray-900 via-gray-900 to-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Developer Utilities
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              12+ Instant Developer Generators
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              CSS Box Shadow, Gradient, Border Radius, Flexbox/Grid generators, JSON Formatter, and Regex Tester working completely offline in your browser.
            </p>
          </div>
          <Link
            href="/tools"
            className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 transition-colors shadow-lg"
          >
            Open Developer Tools Hub
          </Link>
        </div>
      </section>

      {/* OPEN SOURCE COMMUNITY */}
      <section className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8 text-center">
        <div className="space-y-2">
          <span className="text-xs font-bold tracking-wider text-rose-600 uppercase">
            Community Driven
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900">
            100% Free & Open Source Forever
          </h2>
          <p className="text-xs text-gray-500 max-w-lg mx-auto">
            ZeroToDev is built transparently by hundreds of open source contributors worldwide under the MIT license.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/open-source"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-900 text-white font-bold text-xs hover:bg-black transition-colors"
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            View Open Source GitHub Hub
          </Link>
        </div>
      </section>
    </div>
  );
}
