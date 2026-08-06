"use client";

import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { DOCUMENTATION_TREES } from "@/data/documentationTrees";

export default function TutorialsPage() {
  const techs = Object.values(DOCUMENTATION_TREES);

  return (
    <div className="min-h-screen blue-grid-bg text-white">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 py-12 space-y-10">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#CCFF00] text-xs font-black">
            <BookOpen className="w-3.5 h-3.5" />
            <span>VS Code Explorer Documentation Hub</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Select Technology Documentation
          </h1>
          <p className="text-sm text-white/70 leading-relaxed font-normal">
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
                className="glass-card p-6 flex flex-col justify-between group hover:border-[#CCFF00] transition-all space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-black shadow-md"
                      style={{ backgroundColor: "#CCFF00" }}
                    >
                      <BookOpen className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <span className="text-[10px] font-black text-black bg-[#CCFF00] px-3 py-1 rounded-full uppercase">
                      VS Code Explorer
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#CCFF00] transition-colors">
                      {tech.name} Documentation
                    </h3>
                    <p className="text-xs text-white/70 mt-2 leading-relaxed">
                      {tech.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {tech.folders.map((f, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white/80 border border-white/15"
                      >
                        {f.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/15 flex justify-end">
                  <span className="text-xs font-black text-[#CCFF00] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Open {tech.name} Explorer <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
