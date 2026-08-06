"use client";

import Link from "next/link";
import { DOCUMENTATION_TREES } from "@/data/documentationTrees";

interface DocTechNavbarProps {
  activeTechId: string;
}

export default function DocTechNavbar({ activeTechId }: DocTechNavbarProps) {
  const techs = Object.values(DOCUMENTATION_TREES);

  return (
    <div className="bg-gray-50/80 border-b border-black/[0.05] py-2 px-4 sticky top-16 z-40">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center gap-1.5 overflow-x-auto text-xs font-semibold scrollbar-none">
        <span className="text-gray-400 font-medium mr-2 shrink-0">Technology Docs:</span>
        {techs.map((tech) => {
          const isActive = tech.id === activeTechId;
          const firstSlug = tech.folders[0]?.items[0]?.slug || "introduction";

          return (
            <Link
              key={tech.id}
              href={`/docs/${tech.id}/${firstSlug}`}
              className={`px-3 py-1 rounded-xl shrink-0 transition-all ${
                isActive
                  ? "bg-white text-blue-600 shadow-sm border border-black/[0.06] font-bold"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/60"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: tech.color }}
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
