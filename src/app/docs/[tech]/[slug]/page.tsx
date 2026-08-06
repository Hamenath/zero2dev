"use client";

import { useParams } from "next/navigation";
import DocTechNavbar from "@/components/layout/DocTechNavbar";
import VsCodeExplorerSidebar from "@/components/layout/VsCodeExplorerSidebar";
import TocRightSidebar from "@/components/layout/TocRightSidebar";
import CodeBlock from "@/components/tutorial/CodeBlock";
import { DOCUMENTATION_TREES } from "@/data/documentationTrees";
import { Clock, User, CheckCircle2, Lightbulb, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

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
    <div className="min-h-screen blue-grid-bg text-white">
      {/* Secondary Technology Switcher Header */}
      <DocTechNavbar activeTechId={tree.id} />

      {/* Main 3-Column Documentation Layout */}
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 py-8 flex gap-8">
        {/* LEFT COLUMN: VS Code Explorer Sidebar */}
        <VsCodeExplorerSidebar tree={tree} activeSlug={slug} />

        {/* CENTER COLUMN: Prose MDX Reader (85ch Max Width Container) */}
        <main className="flex-1 min-w-0 max-w-4xl mx-auto space-y-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-white/60 font-medium">
            <span>Docs</span>
            <span>/</span>
            <span className="capitalize text-white/80">{tree.name}</span>
            <span>/</span>
            <span className="text-white font-semibold">{currentItem.folderName}</span>
            <span>/</span>
            <span className="text-[#CCFF00] font-bold">{currentItem.title}</span>
          </div>

          {/* Hero Banner */}
          <div className="space-y-4 pb-6 border-b border-white/15">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="px-3 py-1 rounded-full bg-[#CCFF00] text-black font-extrabold">Official Specs</span>
              <span className="flex items-center gap-1 text-white/70"><Clock className="w-3.5 h-3.5 text-[#CCFF00]" /> 8 min read</span>
              <span className="flex items-center gap-1 text-white/70"><User className="w-3.5 h-3.5 text-[#CCFF00]" /> ZeroToDev Core</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {currentItem.title}
            </h1>

            <p className="text-base text-white/80 leading-relaxed font-normal">
              Comprehensive, zero-clutter developer documentation and interactive live examples for {tree.name}.
            </p>
          </div>

          {/* Learning Objectives Box */}
          <div className="glass-card p-6 space-y-3 border-white/25">
            <h3 className="text-xs font-black text-[#CCFF00] uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" /> Learning Objectives
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-white/90 font-medium">
              <li>• Understand core language semantics and architecture</li>
              <li>• Implement production-ready code patterns</li>
              <li>• Adhere to WCAG AA accessibility & performance standards</li>
              <li>• Test code live using Monaco Editor execution engine</li>
            </ul>
          </div>

          {/* PROSE READING AREA */}
          <article className="prose-reading space-y-8 text-sm text-white/90 leading-relaxed">
            <section id="introduction" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Introduction & Technical Specs
              </h2>
              <p>
                In modern software engineering, adhering to official specification standards guarantees cross-browser reliability, high performance, and seamless maintainability.
              </p>
            </section>

            {/* Interactive Code Example */}
            <section id="code-example" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
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
            <div className="glass-card p-5 space-y-2 text-xs text-white">
              <h4 className="font-bold text-[#CCFF00] flex items-center gap-1.5 text-sm">
                <Lightbulb className="w-4 h-4 text-[#CCFF00]" /> Best Practice
              </h4>
              <p className="text-white/80">
                Always test your code across multiple viewports and respect user reduced-motion preferences in CSS (`prefers-reduced-motion: reduce`).
              </p>
            </div>
          </article>

          {/* Footer Navigation (Previous / Next) */}
          <div className="pt-8 border-t border-white/15 flex items-center justify-between gap-4 text-xs font-bold">
            {prevItem ? (
              <a
                href={`/docs/${tree.id}/${prevItem.slug}`}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
              >
                <ArrowLeft className="w-4 h-4 text-[#CCFF00]" /> Prev: {prevItem.title}
              </a>
            ) : <div />}

            {nextItem ? (
              <a
                href={`/docs/${tree.id}/${nextItem.slug}`}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#CCFF00] hover:bg-white text-black transition-colors shadow-lg"
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
