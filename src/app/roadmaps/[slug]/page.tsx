"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Map, CheckCircle2, Circle, ArrowLeft, ExternalLink, BookOpen, Code2, Sparkles, ChevronRight } from "lucide-react";
import confetti from "canvas-confetti";

interface RoadmapNode {
  id: string;
  title: string;
  category: "Fundamentals" | "Advanced" | "Architecture" | "Tools";
  status: "completed" | "in-progress" | "locked";
  description: string;
  details: string;
  recommendedCourseSlug: string;
}

const FRONTEND_NODES: RoadmapNode[] = [
  {
    id: "node-1",
    title: "1. Modern HTML5 & Web Accessibility (a11y)",
    category: "Fundamentals",
    status: "completed",
    description: "Document semantics, ARIA roles, forms, and WCAG AA guidelines.",
    details: "Master semantic markup (<header>, <nav>, <article>), accessibility attributes (aria-label, role), and keyboard navigation focus management.",
    recommendedCourseSlug: "html5-mastery",
  },
  {
    id: "node-2",
    title: "2. Modern CSS Layouts & Flexbox / Grid",
    category: "Fundamentals",
    status: "completed",
    description: "Flexbox 1D alignment, CSS Grid 2D architectures, container queries.",
    details: "Learn how to build responsive interfaces without media query bloat using repeat(auto-fit, minmax(280px, 1fr)) and subgrid layout specs.",
    recommendedCourseSlug: "css-layouts",
  },
  {
    id: "node-3",
    title: "3. TypeScript 5.4 & ESNext Async JavaScript",
    category: "Fundamentals",
    status: "completed",
    description: "Type inference, generics, Promises, Event Loop microtasks.",
    details: "Deep dive into TypeScript strict mode, mapped types, utility types, async/await error boundaries, and V8 engine execution stacks.",
    recommendedCourseSlug: "js-modern",
  },
  {
    id: "node-4",
    title: "4. React 19 Core & Server Components (RSC)",
    category: "Advanced",
    status: "in-progress",
    description: "Hooks, Server Actions, Suspense streaming, use() hook.",
    details: "Understand client vs server component boundaries, bundle optimization, and direct server action database calls without REST API boilerplates.",
    recommendedCourseSlug: "react-19-next-16",
  },
  {
    id: "node-5",
    title: "5. Next.js 16 App Router & Streaming SSR",
    category: "Architecture",
    status: "in-progress",
    description: "Parallel routes, dynamic segments, generateMetadata SEO.",
    details: "Build production enterprise applications with Next.js App Router, caching strategies, revalidation, and static generation.",
    recommendedCourseSlug: "react-19-next-16",
  },
  {
    id: "node-6",
    title: "6. Client State Management (Zustand & TanStack Query)",
    category: "Architecture",
    status: "locked",
    description: "Global store slices, cache invalidation, offline optimistic updates.",
    details: "Decouple state management into atomic Zustand stores and leverage TanStack Query for server state caching and automatic background refetching.",
    recommendedCourseSlug: "react-19-next-16",
  },
  {
    id: "node-7",
    title: "7. Web Performance Optimization & Lighthouse 100",
    category: "Tools",
    status: "locked",
    description: "Core Web Vitals (LCP, INP, CLS), font loading, bundle splitting.",
    details: "Optimize Largest Contentful Paint (LCP) under 1.2s, reduce Interaction to Next Paint (INP) latency, and eliminate layout shifts (CLS).",
    recommendedCourseSlug: "react-19-next-16",
  },
];

export default function InteractiveRoadmapDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [nodes, setNodes] = useState<RoadmapNode[]>(FRONTEND_NODES);
  const [selectedNode, setSelectedNode] = useState<RoadmapNode>(FRONTEND_NODES[3]);

  const toggleNodeCompleted = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === nodeId) {
          const nextStatus = n.status === "completed" ? "in-progress" : "completed";
          if (nextStatus === "completed") {
            confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
          }
          return { ...n, status: nextStatus };
        }
        return n;
      })
    );
  };

  const completedCount = nodes.filter((n) => n.status === "completed").length;
  const progressPercent = Math.round((completedCount / nodes.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/roadmaps")}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <Map className="w-3.5 h-3.5" />
              <span>Frontend Engineering Roadmap</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Frontend Career Pathway 2026
            </h1>
          </div>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-gray-50 border border-black/[0.06]">
          <div className="text-right">
            <p className="text-xs font-bold text-gray-900">{completedCount} / {nodes.length} Topics Completed</p>
            <p className="text-[10px] text-gray-500 font-medium">{progressPercent}% Mastered</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-blue-600 flex items-center justify-center font-extrabold text-xs text-blue-600 bg-white">
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* Main Interactive Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Node Graph Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            Interactive Skill Nodes Timeline
          </h2>

          <div className="space-y-4 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-200">
            {nodes.map((node) => {
              const isSelected = selectedNode.id === node.id;
              const isDone = node.status === "completed";
              const isInProgress = node.status === "in-progress";

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`relative flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-blue-50/90 border-2 border-blue-600 shadow-md"
                      : "bg-white border border-black/[0.08] hover:border-blue-300"
                  }`}
                >
                  {/* Status Indicator Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 font-bold text-xs ${
                      isDone
                        ? "bg-emerald-600 text-white"
                        : isInProgress
                        ? "bg-blue-600 text-white animate-pulse"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : node.id.split("-")[1]}
                  </div>

                  {/* Node Content */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-gray-900">{node.title}</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                        {node.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{node.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Selected Node Drawer Detail */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 premium-card p-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">
                {selectedNode.category} Module
              </span>
              <h3 className="text-xl font-extrabold text-gray-900 leading-snug">
                {selectedNode.title}
              </h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">{selectedNode.details}</p>

            <div className="pt-4 border-t border-black/[0.06] space-y-3">
              <button
                onClick={() => toggleNodeCompleted(selectedNode.id)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                  selectedNode.status === "completed"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {selectedNode.status === "completed" ? "Completed Node" : "Mark Node as Complete"}
              </button>

              <button
                onClick={() => router.push(`/courses/${selectedNode.recommendedCourseSlug}`)}
                className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold text-xs flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" /> Jump to Interactive Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
