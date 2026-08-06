"use client";

import { useParams } from "next/navigation";
import DocTechNavbar from "@/components/layout/DocTechNavbar";
import VsCodeExplorerSidebar from "@/components/layout/VsCodeExplorerSidebar";
import TocRightSidebar from "@/components/layout/TocRightSidebar";
import CodeBlock from "@/components/tutorial/CodeBlock";
import { DOCUMENTATION_TREES } from "@/data/documentationTrees";
import { Clock, User, CheckCircle2, AlertTriangle, Lightbulb, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

export default function UniversalDocPage() {
  const params = useParams();
  const techId = (params?.tech as string) || "html";
  const slug = (params?.slug as string) || "introduction";

  const tree = DOCUMENTATION_TREES[techId] || DOCUMENTATION_TREES.html;

  // Flatten items to find current, previous, and next lessons
  const allItems: { slug: string; title: string; folderName: string }[] = [];
  tree.folders.forEach((f) => {
    f.items.forEach((item) => {
      allItems.push({ slug: item.slug, title: item.title, folderName: f.name });
    });
  });

  const currentIndex = allItems.findIndex((i) => i.slug === slug);
  const currentItem = allItems[currentIndex] || allItems[0];
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : undefined;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : undefined;

  return (
    <div className="min-h-screen bg-white">
      {/* Secondary Technology Switcher Header */}
      <DocTechNavbar activeTechId={tree.id} />

      {/* Main 3-Column Documentation Layout */}
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 py-8 flex gap-8">
        {/* LEFT COLUMN: VS Code Explorer Sidebar */}
        <VsCodeExplorerSidebar tree={tree} activeSlug={slug} />

        {/* CENTER COLUMN: Prose MDX Reader (75ch Max Width Container) */}
        <main className="flex-1 min-w-0 max-w-4xl mx-auto space-y-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Documentation</span>
            <span>/</span>
            <span className="capitalize">{tree.name}</span>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{currentItem.folderName}</span>
            <span>/</span>
            <span className="text-blue-600 font-bold">{currentItem.title}</span>
          </div>

          {/* Hero Banner */}
          <div className="space-y-4 pb-6 border-b border-black/[0.06]">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700">Official Specs</span>
              <span className="flex items-center gap-1 text-gray-500"><Clock className="w-3.5 h-3.5" /> 8 min read</span>
              <span className="flex items-center gap-1 text-gray-500"><User className="w-3.5 h-3.5" /> ZeroToDev Core</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {currentItem.title}
            </h1>

            <p className="text-base text-gray-600 leading-relaxed font-normal">
              Comprehensive, zero-clutter developer documentation and interactive live examples for {tree.name}.
            </p>
          </div>

          {/* Learning Objectives Box */}
          <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200/60 space-y-3">
            <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> Learning Objectives
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-blue-950 font-medium">
              <li>• Understand core language semantics and architecture</li>
              <li>• Implement production-ready code patterns</li>
              <li>• Adhere to WCAG AA accessibility & performance standards</li>
              <li>• Test code live using Monaco Editor execution engine</li>
            </ul>
          </div>

          {/* PROSE READING AREA (75ch max-width for perfect reading ergonomics) */}
          <article className="prose-reading space-y-8 text-sm text-gray-800 leading-relaxed">
            <section id="introduction" className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Introduction & Technical Specs
              </h2>
              <p>
                In modern software engineering, adhering to official specification standards guarantees cross-browser reliability, high performance, and seamless maintainability.
              </p>
            </section>

            {/* Interactive Code Example */}
            <section id="code-example" className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Production Code Example
              </h2>
              <p>
                Review the production-grade snippet below. You can run, edit, or copy this code directly:
              </p>

              <CodeBlock
                title={`${tree.id}_snippet.code`}
                language={tree.id === "javascript" ? "javascript" : tree.id}
                code={
                  tree.id === "html"
                    ? `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>ZeroToDev Docs</title>\n</head>\n<body>\n  <h1>Welcome to ZeroToDev</h1>\n</body>\n</html>`
                    : tree.id === "css"
                    ? `.container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}`
                    : tree.id === "javascript"
                    ? `async function fetchUserData(userId) {\n  const res = await fetch(\`/api/users/\${userId}\`);\n  return res.json();\n}`
                    : tree.id === "react"
                    ? `export default async function Page() {\n  const data = await fetch('https://api.example.com');\n  return <div>Data loaded</div>;\n}`
                    : `def calculate_fibonacci(n):\n    sequence = [0, 1]\n    while len(sequence) < n:\n        sequence.append(sequence[-1] + sequence[-2])\n    return sequence`
                }
              />
            </section>

            {/* Best Practice Box */}
            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/60 space-y-2 text-xs text-emerald-950">
              <h4 className="font-bold text-emerald-800 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-emerald-600" /> Best Practice
              </h4>
              <p>
                Always test your code across multiple viewports and respect user reduced-motion preferences in CSS (`prefers-reduced-motion: reduce`).
              </p>
            </div>
          </article>

          {/* Footer Navigation (Previous / Next) */}
          <div className="pt-8 border-t border-black/[0.06] flex items-center justify-between gap-4 text-xs font-semibold">
            {prevItem ? (
              <a
                href={`/docs/${tree.id}/${prevItem.slug}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Previous: {prevItem.title}
              </a>
            ) : <div />}

            {nextItem ? (
              <a
                href={`/docs/${tree.id}/${nextItem.slug}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-md shadow-blue-500/20"
              >
                Next: {nextItem.title} <ArrowRight className="w-4 h-4" />
              </a>
            ) : <div />}
          </div>
        </main>

        {/* RIGHT COLUMN: TocRightSidebar */}
        <TocRightSidebar
          readingTime="8 min read"
          headings={[
            { id: "introduction", title: "Introduction & Specs" },
            { id: "code-example", title: "Production Code Example" },
          ]}
          previousLesson={prevItem ? { title: prevItem.title, href: `/docs/${tree.id}/${prevItem.slug}` } : undefined}
          nextLesson={nextItem ? { title: nextItem.title, href: `/docs/${tree.id}/${nextItem.slug}` } : undefined}
        />
      </div>
    </div>
  );
}
