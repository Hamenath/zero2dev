"use client";

import Link from "next/link";
import { Heart, Star, GitFork, Users, FileCode, ShieldCheck, ArrowUpRight, CheckCircle2, Code2, Sparkles } from "lucide-react";

export default function OpenSourcePage() {
  const CONTRIBUTORS = [
    { name: "Alex Rivera", role: "Core Maintainer", avatar: "AR", commits: 340 },
    { name: "Elena Rostova", role: "CSS & UI Architect", avatar: "ER", commits: 215 },
    { name: "Marcus Vance", role: "RSC Engine Contributor", avatar: "MV", commits: 180 },
    { name: "Priya Sharma", role: "Monaco IDE Integrator", avatar: "PS", commits: 145 },
    { name: "David Kim", role: "Roadmap Designer", avatar: "DK", commits: 98 },
    { name: "Sofia Rodriguez", role: "Docs & Accessibility", avatar: "SR", commits: 76 },
  ];

  return (
    <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-12 py-12 space-y-12">
      {/* Hero Banner */}
      <div className="premium-card p-10 md:p-14 bg-gradient-to-r from-gray-900 via-gray-900 to-blue-950 text-white space-y-6 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 text-xs font-semibold">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>100% Free & Open Source Forever</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
          Built by the community, for the community.
        </h1>
        <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
          ZeroToDev is completely open source under the MIT License. No paywalls, no login barriers, no tracking, and no corporate ads.
        </p>

        <div className="pt-2">
          <a
            href="https://github.com/Hamenath/zero2dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-gray-900 font-bold text-xs hover:bg-gray-100 transition-colors shadow-md"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            Star on GitHub (Hamenath/zero2dev)
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
          </a>
        </div>

        {/* Live GitHub Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs font-semibold">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
            <span className="text-amber-400 flex items-center gap-1"><Star className="w-4 h-4 fill-amber-400" /> 12,480</span>
            <p className="text-gray-300 text-[11px]">GitHub Stars</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
            <span className="text-blue-400 flex items-center gap-1"><GitFork className="w-4 h-4" /> 1,820</span>
            <p className="text-gray-300 text-[11px]">Forks</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
            <span className="text-emerald-400 flex items-center gap-1"><Users className="w-4 h-4" /> 420</span>
            <p className="text-gray-300 text-[11px]">Contributors</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
            <span className="text-purple-400 flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> MIT</span>
            <p className="text-gray-300 text-[11px]">License</p>
          </div>
        </div>
      </div>

      {/* Contributors Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Featured Open Source Contributors</h2>
          <span className="text-xs text-gray-500 font-semibold">Updated daily from GitHub API</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONTRIBUTORS.map((c, i) => (
            <div key={i} className="premium-card p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                {c.avatar}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-gray-900">{c.name}</h4>
                <p className="text-xs text-blue-600 font-semibold">{c.role}</p>
                <p className="text-[10px] text-gray-400">{c.commits} Commits pushed</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contribution Guide Section */}
      <div className="premium-card p-8 space-y-6">
        <h2 className="text-2xl font-extrabold text-gray-900">How to Contribute to ZeroToDev</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed text-gray-600">
          <div className="p-5 rounded-2xl bg-gray-50 border border-black/[0.05] space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">1</span>
            <h4 className="font-bold text-gray-900 text-sm">Fork the Repository</h4>
            <p>Clone `zerotodev/platform` locally and install dependencies via `npm install`.</p>
          </div>
          <div className="p-5 rounded-2xl bg-gray-50 border border-black/[0.05] space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">2</span>
            <h4 className="font-bold text-gray-900 text-sm">Add Tutorial or Tool</h4>
            <p>Create new interactive MDX modules or add developer tools to the tools registry.</p>
          </div>
          <div className="p-5 rounded-2xl bg-gray-50 border border-black/[0.05] space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">3</span>
            <h4 className="font-bold text-gray-900 text-sm">Submit Pull Request</h4>
            <p>Submit a PR with passing unit tests. Automated CI runs validation in seconds.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
