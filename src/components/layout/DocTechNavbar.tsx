"use client";

import Link from "next/link";
import { DOCUMENTATION_TREES } from "@/data/documentationTrees";

interface DocTechNavbarProps {
  activeTechId: string;
}

export default function DocTechNavbar({ activeTechId }: DocTechNavbarProps) {
  const techs = Object.values(DOCUMENTATION_TREES);

  return (
    <div className="bg-[#002BD4]/90 backdrop-blur-md border-b border-white/15 py-2.5 px-4 sticky top-[60px] z-40">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center gap-2 overflow-x-auto text-xs font-semibold scrollbar-none">
        <span className="text-white/70 font-bold uppercase tracking-wider text-[10px] mr-2 shrink-0">
          Documentation Trees:
        </span>
        {techs.map((tech) => {
          const isActive = tech.id === activeTechId;
          const firstSlug = tech.folders[0]?.items[0]?.slug || "introduction";

          return (
            <Link
              key={tech.id}
              href={`/docs/${tech.id}/${firstSlug}`}
              className={`px-3.5 py-1.5 rounded-full shrink-0 transition-all ${
                isActive
                  ? "bg-[#CCFF00] text-black font-extrabold shadow-md scale-105"
                  : "text-white/80 hover:text-white hover:bg-white/10 border border-white/15"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: isActive ? "#000000" : tech.color }}
                />
                {tech.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
