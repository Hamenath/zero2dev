"use client";

import { useParams } from "next/navigation";
import TutorialSidebar, { Chapter } from "@/components/layout/TutorialSidebar";
import TocRightSidebar from "@/components/layout/TocRightSidebar";
import CodeBlock from "@/components/tutorial/CodeBlock";
import { Clock, Tag, User, CheckCircle2, AlertTriangle, Lightbulb, ArrowLeft, ArrowRight } from "lucide-react";

const SAMPLE_CHAPTERS: Chapter[] = [
  {
    title: "1. Core Semantics & Document Structure",
    items: [
      { slug: "html5-document-structure", title: "Modern HTML5 Document Architecture", duration: "8 min" },
      { slug: "accessibility-aria-guide", title: "Accessibility (WCAG AA) & ARIA", duration: "12 min" },
      { slug: "forms-validation-patterns", title: "Forms & Input Validation", duration: "10 min" },
    ],
  },
  {
    title: "2. CSS Layouts & Alignment",
    items: [
      { slug: "css-flexbox-grid-guide", title: "Flexbox & 2D Grid Layout Engines", duration: "15 min" },
      { slug: "container-queries-subgrid", title: "Container Queries & Subgrid Specs", duration: "14 min" },
    ],
  },
  {
    title: "3. JavaScript Mechanics",
    items: [
      { slug: "javascript-event-loop-async", title: "Event Loop & Microtask Queues", duration: "18 min" },
    ],
  },
];

export default function TutorialDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "html5-document-structure";

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
      {/* LEFT SIDEBAR (Collapsible & Sticky) */}
      <TutorialSidebar categoryTitle="Web Engineering" chapters={SAMPLE_CHAPTERS} />

      {/* CENTER MAIN CONTENT AREA (Max Width 1200px container, Prose 75ch) */}
      <main className="flex-1 min-w-0 max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <a href="/tutorials" className="hover:text-blue-600">Tutorials</a>
          <span>/</span>
          <span className="text-gray-900 font-semibold">HTML5 & Web Semantics</span>
        </div>

        {/* Tutorial Hero Header */}
        <div className="space-y-4 pb-6 border-b border-black/[0.06]">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700">Beginner to Intermediate</span>
            <span className="flex items-center gap-1 text-gray-500"><Clock className="w-3.5 h-3.5" /> 8 min read</span>
            <span className="flex items-center gap-1 text-gray-500"><User className="w-3.5 h-3.5" /> ZeroToDev Core</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Modern HTML5 Document Architecture & Semantics
          </h1>

          <p className="text-base text-gray-600 leading-relaxed font-normal">
            Learn how to structure modern web documents using HTML5 semantic elements like &lt;header&gt;, &lt;nav&gt;, &lt;article&gt;, and &lt;section&gt; for maximum accessibility and SEO ranking.
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {["HTML5", "Semantics", "Accessibility", "SEO"].map((t) => (
              <span key={t} className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[11px] font-medium">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Learning Objectives Box */}
        <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200/60 space-y-3">
          <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600" /> Learning Objectives
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-blue-950 font-medium">
            <li>• Differentiate between generic &lt;div&gt; containers and semantic elements</li>
            <li>• Implement ARIA landmark roles for screen-reader navigation</li>
            <li>• Construct accessible form validation inputs with native attributes</li>
            <li>• Optimize document heading hierarchy (&lt;h1&gt; to &lt;h6&gt;)</li>
          </ul>
        </div>

        {/* PROSE READING AREA (75ch max-width for perfect readability) */}
        <article className="prose-reading space-y-8 text-sm text-gray-800 leading-relaxed">
          <section id="introduction" className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Why Document Architecture Matters
            </h2>
            <p>
              In modern web development, HTML is not merely about placing text on a screen—it provides contextual meaning to web browsers, search engines, and screen-reader accessibility software. Using semantic elements ensures that assistive technologies can effortlessly navigate your application.
            </p>
          </section>

          {/* Interactive Code Example 1 */}
          <section id="semantic-markup" className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Semantic Document Boilerplate
            </h2>
            <p>
              Below is a clean HTML5 semantic structure. Notice how each major layout region uses a designated semantic tag rather than unstyled `div` tags:
            </p>

            <CodeBlock
              title="index.html"
              language="html"
              code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ZeroToDev Semantic Layout</title>
</head>
<body>
  <header>
    <nav aria-label="Main Navigation">
      <a href="/">Home</a>
      <a href="/tutorials">Tutorials</a>
    </nav>
  </header>

  <main>
    <article>
      <h1>Modern HTML5 Architecture</h1>
      <p>Semantic tags improve accessibility and SEO.</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 ZeroToDev</p>
  </footer>
</body>
</html>`}
            />
          </section>

          {/* Best Practices Callout */}
          <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/60 space-y-2 text-xs text-emerald-950">
            <h4 className="font-bold text-emerald-800 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-emerald-600" /> Best Practice
            </h4>
            <p>
              Use only one `&lt;h1&gt;` element per page. Subsections should follow a strict sequential hierarchy (`&lt;h2&gt;`, `&lt;h3&gt;`, `&lt;h4&gt;`) without skipping levels.
            </p>
          </div>

          {/* Common Mistakes Callout */}
          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/60 space-y-2 text-xs text-amber-950">
            <h4 className="font-bold text-amber-800 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> Common Mistake to Avoid
            </h4>
            <p>
              Avoid wrapping interactive buttons inside unclickable `&lt;div onclick="..."&gt;` elements. Always use native `&lt;button&gt;` elements to preserve keyboard focus (`Tab` key) and `Space/Enter` trigger events automatically.
            </p>
          </div>
        </article>

        {/* Footer Navigation (Previous / Next Tutorial) */}
        <div className="pt-8 border-t border-black/[0.06] flex items-center justify-between gap-4 text-xs font-semibold">
          <a
            href="/tutorials"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tutorial Index
          </a>
          <a
            href="/tutorials/accessibility-aria-guide"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-md shadow-blue-500/20"
          >
            Next: Web Accessibility & ARIA <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </main>

      {/* RIGHT SIDEBAR (On This Page TOC & Links) */}
      <TocRightSidebar
        readingTime="8 min read"
        headings={[
          { id: "introduction", title: "Why Document Architecture Matters" },
          { id: "semantic-markup", title: "Semantic Document Boilerplate" },
        ]}
        previousLesson={{ title: "Tutorial Index", href: "/tutorials" }}
        nextLesson={{ title: "Accessibility & ARIA", href: "/tutorials/accessibility-aria-guide" }}
      />
    </div>
  );
}
