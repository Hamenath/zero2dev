"use client";

import Link from "next/link";
import { Map, ArrowRight, CheckCircle2, Layers, Cpu, Server, Globe, Shield, Cloud } from "lucide-react";

const ROADMAPS = [
  {
    id: "frontend",
    slug: "frontend",
    title: "Frontend Developer Roadmap 2026",
    role: "Client Architecture",
    icon: Globe,
    color: "#2563EB",
    nodesCount: 14,
    completedNodes: 8,
    description: "HTML5 semantics, Modern CSS, TypeScript 5, React 19, Next.js 16 App Router, Framer Motion, and Web Vitals Optimization.",
  },
  {
    id: "backend",
    slug: "backend",
    title: "Backend Engineer Roadmap 2026",
    role: "Server Systems",
    icon: Server,
    color: "#16A34A",
    nodesCount: 16,
    completedNodes: 5,
    description: "Node.js runtime, NestJS architecture, PostgreSQL schemas, Prisma ORM, Redis caching, Microservices, and GraphQL APIs.",
  },
  {
    id: "ai-engineer",
    slug: "ai-engineer",
    title: "AI Engineer & RAG Architect",
    role: "LLM & Vector DBs",
    icon: Cpu,
    color: "#8B5CF6",
    nodesCount: 12,
    completedNodes: 3,
    description: "Python 3.12, Vector Embeddings (Pinecone/pgvector), LangChain, Ollama local models, RAG systems, and Prompt Engineering.",
  },
  {
    id: "fullstack",
    slug: "fullstack",
    title: "Full Stack Software Engineer",
    role: "End-to-End Systems",
    icon: Layers,
    color: "#F59E0B",
    nodesCount: 22,
    completedNodes: 10,
    description: "Complete full-stack path connecting React/Next.js frontend with NestJS backend, PostgreSQL database, and Docker deployments.",
  },
  {
    id: "cyber-security",
    slug: "cyber-security",
    title: "Cyber Security & AppSec Specialist",
    role: "Security & Auditing",
    icon: Shield,
    color: "#DC2626",
    nodesCount: 15,
    completedNodes: 2,
    description: "OWASP Top 10 vulnerabilities, Penetration Testing, JWT auth security, Rate limiting, CSP headers, and Cryptography.",
  },
  {
    id: "cloud-devops",
    slug: "cloud-devops",
    title: "Cloud & DevOps Architect",
    role: "Infrastructure",
    icon: Cloud,
    color: "#0284C7",
    nodesCount: 18,
    completedNodes: 4,
    description: "Docker containerization, Kubernetes orchestration, CI/CD pipelines with GitHub Actions, AWS architecture, and Terraform IaC.",
  },
];

export default function RoadmapsPage() {
  return (
    <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 py-12 space-y-10">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold">
          <Map className="w-3.5 h-3.5" />
          <span>Interactive Career Pathways</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Developer Roadmaps 2026
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Step-by-step visual pathways crafted to take you from foundational syntax to staff software engineer expertise.
        </p>
      </div>

      {/* Roadmaps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ROADMAPS.map((roadmap) => {
          const Icon = roadmap.icon;
          const progressPercent = Math.round((roadmap.completedNodes / roadmap.nodesCount) * 100);

          return (
            <Link
              key={roadmap.id}
              href={`/roadmaps/${roadmap.slug}`}
              className="premium-card p-6 flex flex-col justify-between group hover:border-blue-400 transition-all space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: roadmap.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
                    {roadmap.role}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {roadmap.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {roadmap.description}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-3 pt-4 border-t border-black/[0.05]">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-600">
                    {roadmap.completedNodes} of {roadmap.nodesCount} Topics Done
                  </span>
                  <span className="text-blue-600">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Explore Node Graph <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
