"use client";

import Link from "next/link";
import { BookOpen, ArrowRight, Layers, FileCode, Terminal, Atom, Cpu, Globe } from "lucide-react";
import { DOCUMENTATION_TREES } from "@/data/documentationTrees";

export default function TutorialsPage() {
  const techs = Object.values(DOCUMENTATION_TREES);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>VS Code Explorer Documentation Hub</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Select Technology Documentation
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Each programming language features its own independent VS Code-style documentation explorer tree.
        </p>
      </div>

      {/* Grid of Technologies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techs.map((tech) => {
          const firstSlug = tech.folders[0]?.items[0]?.slug || "introduction";

          return (
            <Link
              key={tech.id}
              href={`/docs/${tech.id}/${firstSlug}`}
              className="premium-card p-6 flex flex-col justify-between group hover:border-blue-400 transition-all space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm"
                    style={{ backgroundColor: tech.color }}
                  >
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg uppercase">
                    VS Code Explorer
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {tech.name} Documentation
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {tech.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {tech.folders.map((f, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600"
                    >
                      {f.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.05] flex justify-end">
                <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Open {tech.name} Explorer <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
