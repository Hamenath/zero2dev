"use client";

import Link from "next/link";
import MonacoPlayground from "@/components/playground/MonacoPlayground";
import { ZeroToDevHero } from "@/components/ui/hero";
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
  return (
    <div className="space-y-24 pb-20 blue-grid-bg text-white">
      {/* HERO SECTION - LOCKED & UNTOUCHED */}
      <div className="w-full">
        <ZeroToDevHero />
      </div>

      {/* FEATURED TUTORIALS GRID */}
      <section className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black tracking-wider text-[#CCFF00] uppercase bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Curated Documentation
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 uppercase tracking-tight">
              Popular Learning Pathways
            </h2>
          </div>
          <Link
            href="/tutorials"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#CCFF00] text-black font-extrabold text-xs hover:bg-white transition-colors shadow-md"
          >
            Explore All Tutorials <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "HTML5 Document Standards",
              tech: "HTML5",
              desc: "Modern semantic tags, WCAG AA accessibility, forms, and web APIs.",
              slug: "html",
              firstSlug: "introduction",
              icon: BookOpen,
              level: "Beginner",
              duration: "45 mins",
            },
            {
              title: "CSS Grid & Flexbox Layouts",
              tech: "CSS3",
              desc: "Complete guide to 1D and 2D responsive layout design systems.",
              slug: "css",
              firstSlug: "introduction",
              icon: Layers,
              level: "Beginner",
              duration: "60 mins",
            },
            {
              title: "Async JS & Event Loop",
              tech: "JavaScript",
              desc: "Promises, Async/Await, Event Loop mechanics, and Fetch API.",
              slug: "javascript",
              firstSlug: "introduction",
              icon: Code2,
              level: "Intermediate",
              duration: "75 mins",
            },
            {
              title: "React 19 Server Components",
              tech: "React 19",
              desc: "Server Actions, use() hook, streaming Suspense, and client boundaries.",
              slug: "react",
              firstSlug: "introduction",
              icon: Sparkles,
              level: "Advanced",
              duration: "90 mins",
            },
          ].map((tutorial) => {
            const Icon = tutorial.icon;
            return (
              <Link
                key={tutorial.slug}
                href={`/docs/${tutorial.slug}/${tutorial.firstSlug}`}
                className="glass-card p-6 flex flex-col justify-between group hover:border-[#CCFF00] transition-all space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#CCFF00] text-black flex items-center justify-center font-black shadow-md">
                      <Icon className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <span className="text-[10px] font-black text-black bg-[#CCFF00] px-3 py-1 rounded-full uppercase">
                      {tutorial.tech}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#CCFF00] transition-colors">
                      {tutorial.title}
                    </h3>
                    <p className="text-xs text-white/70 mt-2 leading-relaxed">
                      {tutorial.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/60 font-medium">
                  <span>{tutorial.level}</span>
                  <span className="text-[#CCFF00] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Start <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* MONACO IDE PREVIEW SECTION */}
      <section className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black tracking-wider text-[#CCFF00] uppercase bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Zero-Setup Workspace
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 uppercase tracking-tight">
              Browser Monaco Code IDE
            </h2>
          </div>
          <Link
            href="/playground"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-extrabold text-xs hover:bg-[#CCFF00] transition-colors shadow-md"
          >
            Open Fullscreen IDE <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="glass-card p-4 overflow-hidden border border-white/20 shadow-2xl">
          <MonacoPlayground height="520px" />
        </div>
      </section>

      {/* BENTO GRID DEVELOPER TOOLS */}
      <section className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black tracking-wider text-[#CCFF00] uppercase bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Developer Utilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 uppercase tracking-tight">
              12+ Instant Developer Generators
            </h2>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#CCFF00] text-black font-extrabold text-xs hover:bg-white transition-colors shadow-md"
          >
            Open Developer Tools Hub <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-8 md:p-10 md:col-span-2 flex flex-col justify-between space-y-6 border-white/25">
            <div className="space-y-3 max-w-xl">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-[#CCFF00] text-black uppercase">
                CSS Layout & Visual Utilities
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                CSS Shadow, Gradient, Flexbox & Grid Generators
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Generate production-ready CSS code with real-time sliders and instant copy buttons completely offline inside your browser.
              </p>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#CCFF00] hover:bg-white text-black font-black text-xs shrink-0 transition-colors shadow-lg w-fit"
            >
              Try CSS Tools Hub <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-card p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-white text-black uppercase">
                Data Utilities
              </span>
              <h3 className="text-xl font-black text-white">
                JSON Formatter & Base64 Encoder
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Validate JSON, decode JWT tokens, format string inputs, and test regex expressions offline.
              </p>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#CCFF00] hover:text-black text-white font-bold text-xs transition-colors border border-white/20 w-fit"
            >
              Open Data Tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* OPEN SOURCE COMMUNITY SHOWCASE */}
      <section className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8 text-center">
        <div className="space-y-2">
          <span className="text-xs font-black tracking-wider text-[#CCFF00] uppercase bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
            Community Driven
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            100% Open Source & Built for Everyone
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="glass-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#CCFF00] text-black flex items-center justify-center font-black">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h4 className="font-bold text-white text-lg">No Account Required</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Open the website and start reading or writing code instantly without signups or passwords.
            </p>
          </div>
          <div className="glass-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black">
              <Heart className="w-5 h-5 fill-white stroke-[2.5]" />
            </div>
            <h4 className="font-bold text-white text-lg">Zero Ads & Paywalls</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              No tracking, zero popups, zero corporate banners, and no premium tiers.
            </p>
          </div>
          <div className="glass-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-black">
              <Users className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h4 className="font-bold text-white text-lg">Global Contributors</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Built transparently under MIT license by software engineers worldwide.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
