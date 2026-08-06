"use client";

import { useState } from "react";
import { Users, BookOpen, Award, ShieldAlert, Sparkles, TrendingUp, Settings, Plus } from "lucide-react";

export default function AdminConsolePage() {
  const [activeTab, setActiveTab] = useState<"analytics" | "users" | "courses" | "prompts">("analytics");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-900 text-white text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
            <span>Platform Administration Console</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            ZeroToDev Enterprise Admin
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-black/[0.06] pb-2 text-xs font-semibold">
        {[
          { id: "analytics", label: "Platform Analytics", icon: TrendingUp },
          { id: "users", label: "User Management", icon: Users },
          { id: "courses", label: "Course Manager", icon: BookOpen },
          { id: "prompts", label: "AI Prompt Studio", icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                isActive ? "bg-gray-900 text-white font-bold shadow-sm" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: ANALYTICS */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="premium-card p-6 space-y-1">
              <span className="text-xs text-gray-500 font-semibold">Total Registered Users</span>
              <h3 className="text-3xl font-extrabold text-gray-900">104,280</h3>
              <p className="text-[10px] text-emerald-600 font-bold">↑ +14% this month</p>
            </div>
            <div className="premium-card p-6 space-y-1">
              <span className="text-xs text-gray-500 font-semibold">Code Executions</span>
              <h3 className="text-3xl font-extrabold text-gray-900">1,542,910</h3>
              <p className="text-[10px] text-emerald-600 font-bold">↑ +22% this month</p>
            </div>
            <div className="premium-card p-6 space-y-1">
              <span className="text-xs text-gray-500 font-semibold">Certificates Issued</span>
              <h3 className="text-3xl font-extrabold text-gray-900">18,450</h3>
              <p className="text-[10px] text-blue-600 font-bold">100% QR Verified</p>
            </div>
            <div className="premium-card p-6 space-y-1">
              <span className="text-xs text-gray-500 font-semibold">Monthly Recurring Revenue</span>
              <h3 className="text-3xl font-extrabold text-blue-600">$184,500</h3>
              <p className="text-[10px] text-emerald-600 font-bold">SaaS Enterprise Tier</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USERS */}
      {activeTab === "users" && (
        <div className="premium-card p-6 space-y-4">
          <h3 className="text-xs font-bold text-gray-900 uppercase">Recent Active Learners</h3>
          <div className="divide-y divide-black/[0.05] text-xs">
            {[
              { name: "Alex Rivera", email: "alex@work.dev", xp: "1,450 XP", level: "Lvl 4", status: "Active" },
              { name: "Elena Rostova", email: "elena@stripe.com", xp: "4,210 XP", level: "Lvl 10", status: "Active" },
              { name: "Marcus Vance", email: "marcus@vercel.com", xp: "4,850 XP", level: "Lvl 12", status: "Active" },
            ].map((u, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">{u.name}</h4>
                  <p className="text-gray-400">{u.email}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-blue-600 font-bold">{u.xp}</span>
                  <span className="px-2 py-0.5 rounded bg-gray-100 font-semibold">{u.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PROMPTS */}
      {activeTab === "prompts" && (
        <div className="premium-card p-8 space-y-4">
          <h3 className="text-lg font-bold text-gray-900">AI Tutor Prompt Engineering Studio</h3>
          <p className="text-xs text-gray-500">Configure system instructions for RAG vector index retrieval.</p>
          <textarea
            rows={4}
            defaultValue="You are ZeroToDev AI — a world-class senior software architect. Provide clear, minimal, high-performance code snippets with zero fluff."
            className="w-full p-4 rounded-xl bg-gray-900 text-green-400 font-mono text-xs"
          />
          <button className="px-4 py-2 rounded-xl bg-gray-900 text-white font-bold text-xs">
            Save System Prompt
          </button>
        </div>
      )}
    </div>
  );
}
