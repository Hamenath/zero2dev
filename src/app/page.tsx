"use client";

import Link from "next/link";
import MonacoPlayground from "@/components/playground/MonacoPlayground";
import CodeBlock from "@/components/tutorial/CodeBlock";
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
    <div className="space-y-16 pb-20">
      {/* HERO SECTION */}
      <div className="w-full">
        <ZeroToDevHero />
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "HTML5 Document Standards",
              tech: "HTML5",
              desc: "Modern semantic tags, WCAG AA accessibility, forms, and web APIs.",
              slug: "html5-basics",
              icon: BookOpen,
              level: "Beginner",
              duration: "45 mins",
            },
            {
              title: "CSS Grid & Flexbox Mastery",
              tech: "CSS3",
              desc: "Complete guide to 1D and 2D responsive layout design systems.",
              slug: "css-grid-flexbox",
              icon: Layers,
              level: "Beginner",
              duration: "60 mins",
            },
            {
              title: "Modern Async JavaScript",
              tech: "JavaScript",
              desc: "Promises, Async/Await, Event Loop mechanics, and Fetch API.",
              slug: "javascript-async",
              icon: Code2,
              level: "Intermediate",
              duration: "75 mins",
            },
            {
              title: "React 19 Server Components",
              tech: "React 19",
              desc: "Server Actions, use() hook, streaming Suspense, and client boundary rules.",
              slug: "react19-server-components",
              icon: Sparkles,
              level: "Advanced",
              duration: "90 mins",
            },
          ].map((tutorial) => {
            const Icon = tutorial.icon;
            return (
              <Link
                key={tutorial.slug}
                href="/docs/html/introduction"
                className="premium-card p-6 flex flex-col justify-between group hover:border-blue-400 transition-all space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg uppercase">
                      {tutorial.tech}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {tutorial.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      {tutorial.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs text-gray-400 font-medium">
                  <span>{tutorial.level}</span>
                  <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Start <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}
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
            Open Source & Built for Everyone
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="premium-card p-6 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-gray-900">No Account Required</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Open the website and start reading or writing code instantly without signups or passwords.
            </p>
          </div>
          <div className="premium-card p-6 space-y-2">
            <Heart className="w-6 h-6 text-rose-600" />
            <h4 className="font-bold text-gray-900">Zero Ads & Paywalls</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              No tracking, zero popups, zero corporate banners, and no premium tiers.
            </p>
          </div>
          <div className="premium-card p-6 space-y-2">
            <Users className="w-6 h-6 text-blue-600" />
            <h4 className="font-bold text-gray-900">Global Contributors</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Built transparently under MIT license by software engineers worldwide.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
